import React from 'react'
import { DragSource } from 'react-dnd'

import { ItemTypes } from './Constants'
import { opType, opValueType } from './ops' 

const itemSource = {
    beginDrag(props) {
        return {
            opInfo: {
                value: props.item,
                opType: opType.value.key,
                opValueType: opValueType.variable.key,
            },
            value: props.item.key,
            opType: opType.value.key,
        }
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
}
  
function VarValueDraggable(props) {
    const { item, connectDragSource } = props
    return connectDragSource(
        <div className="assign-var-tag">
            {item.key}
        </div>
    );
}

export default DragSource(ItemTypes.VALUE, itemSource, collect)(VarValueDraggable);