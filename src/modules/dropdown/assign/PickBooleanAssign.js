import React from 'react'
import _ from 'lodash'

import {
    boolUpdateType,
} from '../../logic/types'
import {
    mathType,
    DEFAULT_ASSIGN,
} from '../../modal/vars/components/types';

import {
    DropItem,
    DropTitle,
} from '../components/Common';

export default function PickBooleanAssign(props) {
    const { item } = props
    const selectedValue = item.assign && item.assign.value

    let handleSelect = (item) => {
        props.updatePage({
            ...DEFAULT_ASSIGN,
            mathType: mathType.value,
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
                        rightIcon="mdi mdi-check"
                    >
                        {item.title}
                    </DropItem>
                )
            })}
        </>
    )
}