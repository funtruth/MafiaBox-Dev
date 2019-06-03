import React from 'react'
import _ from 'lodash'

import {
    boolUpdateType,
    parseType,
    variableType,
} from '../../common/types'
import {
    LOGIC_ITEM_VAR,
} from '../../common/defaults'

import { DropItem, DropTitle } from '../components/Common';

export default function PickTypeBool({
    slate,
    update,
    showDropdown,
}){
    const handleSelect = (item) => {
        update({
            ...LOGIC_ITEM_VAR,
            value: item.key,
            display: item.key,
            parseBy: parseType.variable,
            variableTypes: [variableType.boolean.key],
        })
        showDropdown();
    }

    const renderItem = (item) => {
        const chosen = slate.value === item.key
        
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
            <DropTitle>values</DropTitle>
            {items.map(renderItem)}
        </>
    )
}