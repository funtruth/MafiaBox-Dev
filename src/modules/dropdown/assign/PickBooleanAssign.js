import React from 'react'
import _ from 'lodash'

import {
    variableType,
    boolUpdateType,
} from '../../logic/types'
import { DEFAULT_ASSIGN } from '../../modal/vars/components/types';

import DropTitle from '../components/DropTitle';
import DropItem from '../components/DropItem';

export default function PickBooleanAssign(props) {
    const { item } = props
    const selectedValue = item.assign && item.assign.value

    let handleSelect = (item) => {
        props.updatePage({
            assign: DEFAULT_ASSIGN,
            value: item.key,
            variableTypes: [variableType.boolean.key],
        })
        props.showDropdown()
    }

    let items = _.sortBy(boolUpdateType, i => i.index)
    
    return (
        <>
            <DropTitle>boolean type</DropTitle>
            {items.map(item => {
                const chosen = typeof selectedValue === 'string' && selectedValue === item.key
                    
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