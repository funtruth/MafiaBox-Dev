import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { useSelector } from 'react-redux'
import Fuse from 'fuse.js'

import {
    dropdownType,
    fuseType,
    parseType,
} from '../../common/types';
import {

    LOGIC_ITEM_VAR,
} from '../../common/defaults'

import {
    parseJS,
} from '../../logic/proptool';

import {
    DropEmpty,
    DropItem,
    DropTitle,
    DropParent,
    DropScroll,
} from '../components/Common';

export default function PickGlobalVar({
    slate,
    update,
    formatAsVariable,
    showDropdown,
}) {
    const globalVars = useSelector(state => state.page.globalVars)

    const [text, setText] = useState("")
    const [fuse] = useState(new Fuse(_.filter(globalVars), fuseType.globalVar))
    const [results, setResults] = useState([])
    useEffect(() => {
        if (!text) {
            setResults(_.filter(globalVars))
        } else {
            setResults(fuse.search(text))
        }
    }, [text, globalVars])
    const handleType = (e) => setText(e.target.value)
    
    const handleSelect = (item) => {
        if (formatAsVariable) {
            update({
                ...LOGIC_ITEM_VAR,
                value: item.key,
                display: parseJS(item.key),
                parseBy: parseType.variable,
                variableTypes: item.variableTypes,
            })
        } else {
            update(item.key)
        }
        showDropdown();
    }

    const renderItem = (item) => {
        const chosen = formatAsVariable ? slate.value === item.key : slate === item.key

        return (
            <DropItem
                key={item.key}
                chosen={chosen}
                rightCheck
                onClick={() => handleSelect(item)}
                text={item.title}
            />
        )
    }
    
    return (
        <>
            <DropTitle>search for</DropTitle>
            <input
                className="tag-input"
                value={text}
                onChange={handleType}
                placeholder="Search ..."
                type='text'
                autoFocus
            />
            <DropTitle>values</DropTitle>
            <DropScroll>
                {results.map(renderItem)}
                <DropEmpty list={results} text="no results found"/>
            </DropScroll>
            <DropTitle>options</DropTitle>
            <DropParent
                dropdown={dropdownType.createGlobalVar}
                showDropdown={showDropdown}
                leftIcon="pencil"
                text="create ..."
            />
        </>
    )
}