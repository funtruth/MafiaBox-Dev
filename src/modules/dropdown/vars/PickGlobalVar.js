import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import Fuse from 'fuse.js'

import {
    updateType,
    VAR_DEFAULTS,
} from '../../logic/types';
import {
    fuseType,
    dropdownType,
} from '../types';

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

export default connect(
    state => ({
        globalVars: state.page.globalVars,
    }),
)(function PickGlobalVar(props) {
    const { globalVars, updateBy, currentValue } = props

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
        if (updateBy === 'field') {
            props.updatePage({
                value: item.key,
                display: item.title,
            })
        } else {
            props.updatePage({
                ...VAR_DEFAULTS,
                value: item.key,
                display: parseJS(item.key),
                updateType: updateType.variable,
                variableTypes: item.variableTypes,
            })
        }
        props.showDropdown();
    }

    const renderItem = (item) => {
        return (
            <DropItem
                key={item.key}
                chosen={currentValue === item.key}
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
                {...props}
                dropdownType={dropdownType.createGlobalVar}
                leftIcon="mdi mdi-pencil"
                text="create ..."
            />
        </>
    )
})