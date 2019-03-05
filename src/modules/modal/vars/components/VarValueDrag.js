import React from 'react'
import { DragSource } from 'react-dnd'

import { ItemTypes } from './Constants'
import { opType, opValueType } from './ops' 
import { COLLECT_DRAG } from '../../ModalDND';

const itemSource = {
    beginDrag(props) {
        return {
            value: props.item,
            opType: opType.value.key,
            opValueType: opValueType.variable.key,
        }
    }
}

function VarValueDrag(props) {
    const { item, connectDragSource } = props
    return connectDragSource(
        <div className="assign-var-tag">
            {item.key}
        </div>
    );
}

export default DragSource(
    ItemTypes.VALUE,
    itemSource,
    COLLECT_DRAG,
)(VarValueDrag);