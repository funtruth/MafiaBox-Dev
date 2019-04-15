import React from 'react'
import _ from 'lodash'

import {
    mathType,
    DEFAULT_ASSIGN,
} from '../../modal/vars/components/types';

import {
    DropItem,
    DropTitle,
} from '../components/Common'

export default function PickAssignableVar(props) {
    const { attachVar } = props

    let handleSelect = (item) => {
        props.updatePage({
            ...DEFAULT_ASSIGN,
            mathType: mathType.value.key,
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