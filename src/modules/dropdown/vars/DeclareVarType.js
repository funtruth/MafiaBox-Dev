import React from 'react'
import _ from 'lodash'

import { variableType } from '../../logic/types'

import {
    DropItem,
    DropTitle,
} from '../components/Common';
import { LOGIC_ITEM_VAR } from '../../logic/defaults';

//source: LogicItem > LogicDeclare
export default function DeclareVarType({
    slate,
    path,
    variableTypeLocked,//passed
    updateGeneral,
    showDropdown,
}){
    const { variableTypes } = slate
    const currentValueIsArray = Array.isArray(variableTypes)

    //set basic variable type, then set a parse-able variable @ item.declare
    const handleSelect = item => {
        if (variableTypeLocked) return;

        updateGeneral({
            path,
            update: {
                variableTypes: [item.key],
            },
        }, {
            path: [...path, 'declare'],
            update: {
                ...LOGIC_ITEM_VAR,
                parseBy: item.parseBy,
                variableTypes: [item.key],
            }
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

    //still allows user to view locked variableTypes
    if (variableTypeLocked) {
        const types = variableTypes.map(vT => variableType[vT])
        return (
            <>
                <DropTitle>variable types</DropTitle>
                {types.map(renderItem)}
            </>
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