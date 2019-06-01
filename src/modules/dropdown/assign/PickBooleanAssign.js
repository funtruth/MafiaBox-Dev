import React from 'react'
import _ from 'lodash'

import {
    boolUpdateType,
    parseType,
} from '../../common/types'
import {
    LOGIC_ITEM_VAR,
} from '../../common/defaults';

import {
    DropItem,
    DropTitle,
} from '../components/Common';

export default function PickBooleanAssign(props) {
    const { item } = props
    const selectedValue = item.assign && item.assign.value

    let handleSelect = (item) => {
        props.updatePage({
            ...LOGIC_ITEM_VAR,
            parseBy: parseType.variable,
            value: item.key,
        })
        props.showDropdown()
    }

    let items = _.sortBy(boolUpdateType, i => i.index)
    
    return (
        <>
            <DropTitle>boolean type</DropTitle>
            {items.map(item => {
                const chosen = selectedValue === item.key
                    
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