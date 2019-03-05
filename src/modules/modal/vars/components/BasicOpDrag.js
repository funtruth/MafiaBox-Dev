import React from 'react'
import { DragSource } from 'react-dnd'

import { ItemTypes } from './Constants'
import { opType } from './ops' 
import { COLLECT_DRAG } from '../../ModalDND';

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
    ItemTypes.BASIC_OP,
    itemSource,
    COLLECT_DRAG,
)(BasicOpDrag);