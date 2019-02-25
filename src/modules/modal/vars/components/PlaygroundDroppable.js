import React from 'react'
import { ItemTypes } from './Constants'
import { DropTarget } from 'react-dnd'

const itemTarget = {
    drop(props) {
        console.log('dropped!')
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
            className="basic-op-bubble"
        >
            ...
        </div>
    );
}

export default DropTarget(ItemTypes.BASIC_OP, itemTarget, collect)(PlaygroundDroppable);