import React from 'react'
import _ from 'lodash'

import {
    updateType,
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

    const handleSelect = (item) => {
        props.updatePage({
            ...VAR_DEFAULTS,
            value: item.key,
            display: item.key,
            updateType: updateType.boolean,
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
                rightCheck
                text={item.title}
            />
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