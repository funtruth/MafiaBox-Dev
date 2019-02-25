import React from 'react'
import _ from 'lodash'

import { opType, basicOpType, DEFAULT_ASSIGN } from '../../modal/vars/components/ops'

import DropTitle from '../components/DropTitle'
import DropItem from '../components/DropItem'

export default function ChangeOp(props) {
    let chosen = props.currentValue.basicOpType.key
    
    let handleSelect = (item) => {
        props.updatePage({
            ...DEFAULT_ASSIGN,
            opType: opType.basicOp.key,
            basicOpType: item,
        })
        props.showDropdown()
    }

    return (
        <>
            <DropTitle>operators</DropTitle>
            {_.toArray(basicOpType).map(item => {
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