import React from 'react'
import _ from 'lodash'

import { variableType } from '../../logic/types'

import {
    DropItem,
    DropTitle,
} from '../components/Common';

//source: LogicItem > LogicDeclareItem
export default function DeclareVarType(props) {
    const { currentValue } = props
    const currentValueIsArray = Array.isArray(currentValue)

    const handleSelect = item => {
        props.updatePage({
            variableTypes: [item.key],
        })
        props.showDropdown();
    }

    const declarable = _.filter(variableType, i => i.declarable)
    return (
        <>
            <DropTitle>variable types</DropTitle>
            {declarable.map(item => {
                const chosen = currentValueIsArray && currentValue.includes(item.key)
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
            })}
        </>
    )
}