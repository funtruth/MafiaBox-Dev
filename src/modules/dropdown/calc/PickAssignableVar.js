import React from 'react'
import _ from 'lodash'

import {
    opType,
    opValueType,
    DEFAULT_ASSIGN,
} from '../../modal/vars/components/ops';

import {
    DropItem,
    DropTitle,
} from '../components/Common'

export default function PickAssignableVar(props) {
    const { attachVar } = props

    let handleSelect = (item) => {
        props.updatePage({
            ...DEFAULT_ASSIGN,
            opType: opType.value.key,
            opValueType: opValueType.variable.key,
            value: item,
        })
        props.showDropdown()
    }

    const vars = _.filter(attachVar, i => !i.static)
    return (
        <>
            <DropTitle>vars</DropTitle>
            {vars.map(item => (
                <DropItem
                    key={item.key}
                    onClick={() => handleSelect(item)}
                >
                    {item.key}
                </DropItem>
            ))}
        </>
    )
}