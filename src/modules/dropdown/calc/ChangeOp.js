import React from 'react'
import _ from 'lodash'

import { mathType, mathOperatorType, DEFAULT_ASSIGN } from '../../modal/vars/components/types'

import DropTitle from '../components/DropTitle'
import DropItem from '../components/DropItem'

export default function ChangeOp(props) {
    let chosen = props.currentValue.mathOperatorType.key
    
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
            {_.toArray(mathOperatorType).map(item => {
                const itemChosen = (chosen === item.key).toString()

                return (
                    <DropItem
                        key={item.key}
                        chosen={itemChosen}
                        onClick={() => handleSelect(item)}
                        leftIcon={item.icon}
                    >
                        {item.key}
                    </DropItem>
                )
            })}
        </>
    )
}