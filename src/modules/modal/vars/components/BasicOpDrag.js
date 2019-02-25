import React from 'react'
import { DragSource } from 'react-dnd'

import { ItemTypes } from './Constants'
import { opType } from './ops' 

const itemSource = {
    beginDrag(props) {
        return {
            opInfo: {
                basicOpType: props.item,
                opType: opType.basicOp.key,
            },
            basicOpType: props.item,
            opType: opType.basicOp.key,
        }
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
}
  
function BasicOpDrag(props) {
    const { item, connectDragSource } = props
    return connectDragSource(
        <div className="basic-op" style={{ marginRight: 8 }}>
            <div className="basic-op-bubble">x</div>
            <div className="basic-op-op">{item.char}</div>
            <div className="basic-op-bubble">y</div>
        </div>
    );
}

export default DragSource(
    ItemTypes.BASIC_OP,
    itemSource,
    collect
)(BasicOpDrag);