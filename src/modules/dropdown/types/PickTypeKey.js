import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import Fuse from 'fuse.js'

import Input from '../../components/Input';
import { DropTitle, DropEmpty, DropItem } from '../components/Common';
import { fuseType, parseType, variableType } from '../../common/types';
import { LOGIC_ITEM_VAR } from '../../logic/defaults';

export default function PickTypeKey({
    update,
    showDropdown,
}){
    const { pageRepo } = useSelector(state => state.page)
    const [results, setResults] = useState([])
    const [fuse, setFuse] = useState({})

    useEffect(() => {
        setFuse(new Fuse(_.filter(pageRepo, i => i.title), fuseType.searchBoard))
    }, [pageRepo])

    const handleChange = (text) => {
        setResults(fuse.search(text))
    }

    const handleSelect = (item) => {
        update({
            ...LOGIC_ITEM_VAR,
            display: item.title,
            parseBy: parseType.constant,
            value: item.key,
            variableTypes: [variableType.key.key],
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