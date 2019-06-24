import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import Fuse from 'fuse.js'

import { fuseType, parseType, variableType, boardType } from '../../common/types';
import { LOGIC_ITEM_VAR } from '../../logic/defaults';

import { getCode } from '../../logic/LogicEngine';

import Input from '../../components/Input';
import { DropTitle, DropEmpty, DropItem } from '../components/Common';

export default function PickTypeFunction({
    update,
    showDropdown,
}){
    const { pageRepo } = useSelector(state => state.page)
    const [results, setResults] = useState([])
    const [fuse, setFuse] = useState({})

    useEffect(() => {
        setFuse(new Fuse(_.filter(pageRepo, i => i.title && i.board === boardType.events.key), fuseType.searchBoard))
    }, [pageRepo])

    const handleChange = (text) => {
        setResults(fuse.search(text))
    }

    const handleSelect = (item) => {
        const code = getCode(item.eventLogic)
        update({
            ...LOGIC_ITEM_VAR,
            display: item.title,
            parseBy: parseType.constant,
            value: code,
            variableTypes: [variableType.function.key],
        })
        showDropdown();
    }

    const renderItem = (item) => {
        return (
            <DropItem
                key={item.key}
                text={item.title}
                onClick={() => handleSelect(item)}
            />
        )
    }

    return (
        <>
            <Input
                theme="tag"
                autofocus
                onChange={handleChange}
            />
            <DropTitle>results</DropTitle>
            {results.map(renderItem)}
            <DropEmpty list={results} text="no results found"/>
        </>
    )
}