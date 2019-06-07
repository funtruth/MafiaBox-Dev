import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import Fuse from 'fuse.js'

import {
    parseType,
    variableType,
    fuseType,
    dropdownType,
} from '../../common/types'
import {
    LOGIC_ITEM_VAR,
} from '../../common/defaults'

import { DropItem, DropTitle, DropScroll, DropEmpty, DropParent } from '../components/Common';

export default function PickTypeGlobal({
    slate,
    update,
    showDropdown,
}){
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
        update({
            ...LOGIC_ITEM_VAR,
            value: item.value,
            display: item.display,
            parseBy: parseType.constant,
            variableTypes: [variableType.global.key],
        })
        showDropdown();
    }

    const renderItem = (item) => {
        return (
            <DropItem
                key={item.key}
                chosen={slate.key === item.key}
                onClick={() => handleSelect(item)}
                text={item.display}
            />
        )
    }
    
    return (
        <>
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