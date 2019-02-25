import React from 'react'
import { ItemTypes } from './Constants'
import { DropTarget } from 'react-dnd'

import { DEFAULT_ASSIGN } from './ops'

const itemTarget = {
    drop(props, monitor) {
        const item = monitor.getItem()
        const didDrop = monitor.didDrop()
        const index = Object.keys(props.playground).length

        if (didDrop) return;
        props.setPlayground({
            ...props.playground,
            [index]: {
                ...DEFAULT_ASSIGN,
                ...item.opInfo,
            }
        })
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
        <div className="playground" style={{ backgroundColor: isOver && 'rgba(70, 73, 78, 1)' }}>
            <div className="dashboard-section-title" style={{ color: isOver && '#fff' }}>playground</div>
            <div className="row -x-p">{children}</div>
        </div>
    );
}

export default DropTarget([ItemTypes.BASIC_OP, ItemTypes.VALUE], itemTarget, collect)(PlaygroundDroppable);