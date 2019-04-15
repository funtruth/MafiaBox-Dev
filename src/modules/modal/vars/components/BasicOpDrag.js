import React from 'react'
import { DragSource } from 'react-dnd'

import { mathType, ItemTypes } from './types' 
import { COLLECT_DRAG } from '../../ModalDND';

const itemSource = {
    beginDrag(props) {
        return {
            opInfo: {
                mathOperatorType: props.item,
                mathType: mathType.operation,
            },
            mathOperatorType: props.item,
            mathType: mathType.operation,
        }
    }
}
  
function BasicOpDrag(props) {
    const { item, connectDragSource } = props
    return connectDragSource(
        <div className="basic-op" style={{ marginRight: 8, cursor: 'pointer' }}>
            <div className="basic-op-bubble">x</div>
            <div className="basic-op-op">{item.char}</div>
            <div className="basic-op-bubble">y</div>
        </div>
    );
}

export default DragSource(
    ItemTypes.OPERATION,
    itemSource,
    COLLECT_DRAG,
)(BasicOpDrag);