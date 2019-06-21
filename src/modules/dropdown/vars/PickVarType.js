import React from 'react'
import _ from 'lodash'

import { variableType } from '../../logic/types'

import {
    DropItem,
    DropTitle,
} from '../components/Common';

export default function PickVarType({
    slate,
    path,
    updateGeneral,
    showDropdown,
}){
    const { variableTypes } = slate
    const currentValueIsArray = Array.isArray(variableTypes)

    const handleSelect = item => {
        updateGeneral({
            path,
            update: {
                variableTypes: [item.key],
            },
        })
        showDropdown();
    }

    const renderItem = (item) => {
        const chosen = currentValueIsArray && variableTypes.includes(item.key)

        return (
            <DropItem
                key={item.key}
                chosen={chosen}
                onClick={() => handleSelect(item)}
                leftIcon={item.icon}
                rightCheck
                text={item.title}
            />
        )
    }

    const declarable = _.filter(variableType, i => i.declarable)
    return (
        <>
            <DropTitle>variable types</DropTitle>
            {declarable.map(renderItem)}
        </>
    )
}