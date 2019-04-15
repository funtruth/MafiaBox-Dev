import React from 'react'
import _ from 'lodash'

import { mathOperatorType, mathType, DEFAULT_ASSIGN } from '../../modal/vars/components/types'

import DropTitle from '../components/DropTitle'
import DropItem from '../components/DropItem'

export default function PickOpType(props) {
    let handleSelect = (item) => {
        props.updatePage({
            ...DEFAULT_ASSIGN,
            mathType: mathType.operation,
            mathOperatorType: item,
        })
        props.showDropdown()
    }

    return (
        <>
            <DropTitle>operators</DropTitle>
            {_.toArray(mathOperatorType).map(item => (
                <DropItem
                    key={item.key}
                    leftIcon={item.icon}
                    onClick={() => handleSelect(item)}
                >
                    {item.key}
                </DropItem>
            ))}
        </>
    )
}