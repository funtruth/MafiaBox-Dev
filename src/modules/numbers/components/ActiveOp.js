import React from 'react'

import { mathType, mathOperatorType } from '../../common/types'

import ValueDrop from '../dnd/ValueDrop'
import BasicOpDrop from '../dnd/BasicOpDrop';
import { Text } from '../../components/Common'

export default function ActiveOp(props) {
    let { source, mathKey, mathRepo } = props
    
    if (!source || !mathRepo) {
        return (
            <div className="empty-text">
                Drag Operation or Value Here
            </div>
        )
    }
    
    /*
        |[ ] () [ ]|
          ^
        @params of empty ValueDrag
            props.mathItem, of the parent BasicOp
            props.position
    */
    if (!mathKey) {
        return (
            <ValueDrop {...props}>
                ...
            </ValueDrop>
        )
    }

    const mathItem = mathRepo[mathKey]
    const { math, mathOperator, value, left, right } = mathItem

    switch(math) {
        case mathType.value:
        case mathType.constant:
            return (
                <ValueDrop
                    {...props}
                    mathItem={mathItem}
                >
                    {value.display}
                </ValueDrop>
            )
        case mathType.operation:
            return (
                <BasicOpDrop
                    {...props}
                    mathItem={mathItem}
                >
                    <ActiveOp
                        {...props}
                        mathItem={mathItem}
                        mathKey={left}
                        position="left"
                    />
                    <Text>
                        {mathOperatorType[mathOperator].char}
                    </Text>
                    <ActiveOp
                        {...props}
                        mathItem={mathItem}
                        mathKey={right}
                        position="right"
                    />
                </BasicOpDrop>
            )
        default:
            return null;
    }
}