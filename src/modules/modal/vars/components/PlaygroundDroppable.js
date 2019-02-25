import React from 'react'
import { ItemTypes } from './Constants'
import { DropTarget } from 'react-dnd'

import { DEFAULT_ASSIGN } from './ops'

const itemTarget = {
    drop(props, monitor) {
        const item = monitor.getItem()
        props.setPlayground([
            ...props.playground,
            {
                ...DEFAULT_ASSIGN,
                opType: item.opType,
                basicOpType: item.basicOpType,
            }
        ])
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    }
}
  
function PlaygroundDroppable(props) {
    const { connectDropTarget } = props
    return connectDropTarget(
        <div
            className="playground"
        >
            drag item here
        </div>
    );
}

export default DropTarget([ItemTypes.BASIC_OP, ItemTypes.VALUE], itemTarget, collect)(PlaygroundDroppable);