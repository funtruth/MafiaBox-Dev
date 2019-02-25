import React from 'react'
import { ItemTypes } from './Constants'
import { DragSource } from 'react-dnd'

const itemSource = {
    beginDrag(props) {
        console.log({props})
        return {};
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
}
  
function InactiveOpDraggable(props) {
    const { char, connectDragSource } = props
    return connectDragSource(
        <div className="basic-op">
            <div className="basic-op-bubble">x</div>
            <div className="basic-op-op">{char}</div>
            <div className="basic-op-bubble">y</div>
        </div>
    );
}

export default DragSource(ItemTypes.BASIC_OP, itemSource, collect)(InactiveOpDraggable);