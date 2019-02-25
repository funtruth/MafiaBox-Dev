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
                ...item.opInfo,
            }
        ])
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true }),
    }
}
  
function PlaygroundDroppable(props) {
    const { connectDropTarget, isOver, children } = props
    return connectDropTarget(
        <div
            className="playground"
            style={{
                backgroundColor: isOver && 'rgba(70, 73, 78, 1)',
            }}
        >
            {children}
        </div>
    );
}

export default DropTarget([ItemTypes.BASIC_OP, ItemTypes.VALUE], itemTarget, collect)(PlaygroundDroppable);