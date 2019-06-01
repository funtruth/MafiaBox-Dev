import React from 'react'
import _ from 'lodash'

import {
    updateType,
    boolUpdateType,
    variableType,
} from '../../common/types'
import {
    LOGIC_ITEM_VAR,
} from '../../common/defaults'

import {
    DropItem,
    DropTitle,
 } from '../components/Common';

export default function PickBoolean(props) {
    const { attach, subfieldKey } = props
    const currentValue = attach[subfieldKey] || {}

    const handleSelect = (item) => {
        props.updatePage({
            ...LOGIC_ITEM_VAR,
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