import React from 'react'
import _ from 'lodash'

import { variableType } from '../../logic/types'

import {
    DropItem,
    DropTitle,
} from '../components/Common';

//source: LogicItem > LogicDeclare
export default function DeclareVarType({
    slate,
    update,
    showDropdown,
}) {
    const { variableTypes } = slate
    const currentValueIsArray = Array.isArray(variableTypes)

    const handleSelect = item => {
        update({
            variableTypes: [item.key],
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