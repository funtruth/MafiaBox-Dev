import React from 'react'
import _ from 'lodash'

import {
    mathOperatorType,
    mathType,
} from '../../common/types'

import {
    DropTitle,
    DropItem,
} from '../components/Common'

export default function PickOpType(props) {
    //does not use DEFAULT_ASSIGN to keep left/right, value is assumed to be "" already
    const handleSelect = (item) => {
        props.updatePage({
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
                    text={item.key}
                />
            ))}
        </>
    )
}