import React from 'react'
import { DragSource } from 'react-dnd'

import { ItemTypes } from './Constants'
import { opType, opValueType } from './ops' 

const itemSource = {
    beginDrag(props) {
        return {
            value: props.value,
            opType: opType.value.key,
            opValueType: opValueType.constant.key,
        }
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
}
  
function ValueDrag(props) {
    const { value, connectDragSource } = props
    return connectDragSource(
        <div className="assign-var-tag">
            {value}
        </div>
    );
}

export default DragSource(
    ItemTypes.VALUE,
    itemSource,
    collect
)(ValueDrag);