import React from 'react'
import _ from 'lodash'

import { DEFAULT_ASSIGN } from '../../modal/vars/components/ops';

import { variableType } from '../../logic/types'
import DropTitle from '../components/DropTitle';
import DropItem from '../components/DropItem';

export default function DeclareVarType(props) {
    const { currentValue } = props
    const currentValueIsArray = Array.isArray(currentValue)

    const handleSelect = item => {
        let updatedTypes = item.subtype ? [item.key, item.subtype] : [item.key]
        props.updatePage({
            assign: DEFAULT_ASSIGN,
            variableTypes: updatedTypes,
        })
        props.showDropdown()
    }

    return (
        <>
            <DropTitle>variable types</DropTitle>
            {_.filter(variableType, i => i.declarable).map(item => {
                const chosen = currentValueIsArray && currentValue.includes(item.key)
                return (
                    <DropItem
                        key={item.key}
                        chosen={chosen}
                        onClick={() => handleSelect(item)}
                        leftIcon={item.icon}
                        rightIcon="mdi mdi-check"
                    >
                        {item.title}
                    </DropItem>
                )
            })}
        </>
    )
}