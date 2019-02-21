import React from 'react'
import _ from 'lodash'

import { basicOpType, opBubbleType } from '../../modal/vars/calc/ops'

import DropTitle from '../components/DropTitle'
import DropItem from '../components/DropItem'

export default function PickOpType(props) {
    let handleSelect = (item) => {
        props.updatePage({
            type: opBubbleType.basicOp.key,
            basicOpType: item.key,
        })
    }

    return (
        <div>
            <DropTitle>operators</DropTitle>
            {_.toArray(basicOpType).map(item => (
                <DropItem
                    key={item.key}
                    leftIcon={item.icon}
                    onClick={() => handleSelect(item)}
                >
                    {item.key}
                </DropItem>
            ))}
        </div>
    )
}