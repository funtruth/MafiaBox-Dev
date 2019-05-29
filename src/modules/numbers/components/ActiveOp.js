import React from 'react'

import { mathType, mathOperatorType } from '../../common/types'

import ValueDrop from '../dnd/ValueDrop'
import BasicOpDrop from '../dnd/BasicOpDrop';
import { Text } from '../../components/Common'

export default function ActiveOp(props) {
    let { source, mathKey, mathRepo } = props

    if (!source) {
        return (
            <div className="empty-text">
                Drag Operation or Value Here
            </div>
        )
    }
    
    if (!mathRepo || !mathKey || !mathRepo[mathKey]) {
        return (
            <ValueDrop {...props} position="none">
                ...
            </ValueDrop>
        )
    }

    const mathItem = mathRepo[mathKey]
    const { math, mathOperator, value, left, right } = mathItem

    switch(math) {
        case mathType.value:
            return (
                <ValueDrop {...props} mathKey={mathKey}>
                    {value}
                </ValueDrop>
            )
        case mathType.operation:
            return (
                <BasicOpDrop {...props} mathKey={mathKey}>
                    <ActiveOp {...props} mathKey={left} position="left"/>
                    <Text>
                        {mathOperatorType[mathOperator].char}
                    </Text>
                    <ActiveOp {...props} mathKey={right} position="right"/>
                </BasicOpDrop>
            )
        default:
            return null;
    }
}