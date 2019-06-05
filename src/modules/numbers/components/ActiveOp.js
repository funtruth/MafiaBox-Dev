import React from 'react'

import { parseType } from '../../common/types'

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
    const { parseBy, value, display } = mathItem
    const { left, right } = value
    
    switch(parseBy) {
        case parseType.variable:
        case parseType.constant:
            return (
                <ValueDrop
                    {...props}
                    mathItem={mathItem}
                >
                    {display}
                </ValueDrop>
            )
        case parseType.operation:
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
                    <Text before="xxs" after="xxs">
                        {display}
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