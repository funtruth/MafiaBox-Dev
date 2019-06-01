import React from 'react'
import { DropTarget } from 'react-dnd'

import { parseType, parseOperatorType } from '../../common/types';
import BasicOp from '../components/BasicOp';

const itemTarget = {
    drop(props, monitor) {
        const { mathItem } = props
        
        const didDrop = monitor.didDrop()
        if (didDrop) return;

        const item = monitor.getItem()
        props.changeValue(mathItem.key, item)
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true }),
    }
}
  
function BasicOpDrop(props) {
    const { connectDropTarget, isOver, children, mathItem } = props
    const { value } = mathItem
    const { operator } = value

    const mathColor = parseOperatorType[operator].color
    
    return connectDropTarget(
        <div>
            <BasicOp
                bg={isOver ? 'purple' : 'charcoal'}
                color={mathColor}
            >
                {children}
            </BasicOp>
        </div>
    );
}

export default DropTarget(
    [parseType.operation, parseType.variable],
    itemTarget,
    collect
)(BasicOpDrop);