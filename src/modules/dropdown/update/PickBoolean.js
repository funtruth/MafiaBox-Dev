import React from 'react'
import _ from 'lodash'

import {
    boolUpdateType,
    variableType,
    VAR_DEFAULTS,
} from '../../logic/types'

import {
    DropItem,
    DropTitle,
 } from '../components/Common';

export default function PickBoolean(props) {
    const { attach, subfieldKey } = props

    const currentValue = attach[subfieldKey] || {}

    //defaults => update: true, mutate: false
    const updateValue = {
        update: currentValue.update === undefined ? true : currentValue.update,
        mutate: currentValue.mutate === undefined ? true : currentValue.mutate,
    }

    const handleSelect = (item) => {
        props.updatePage({
            ...VAR_DEFAULTS,
            ...updateValue,
            value: item.key,
            display: item.key,
            code: item.key,
            variableTypes: [variableType.boolean.key],
        })
        props.showDropdown()
    }

    const renderItem = (item) => {
        const chosen = currentValue.value === item.key
        
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
    }

    const items = _.sortBy(boolUpdateType, i => i.index)
    
    return (
        <>
            <DropTitle>boolean type</DropTitle>
            {items.map(renderItem)}
        </>
    )
}