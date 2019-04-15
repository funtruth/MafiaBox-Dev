import React from 'react'
import { DragSource } from 'react-dnd'

import {
    mathType,
    ItemTypes,
} from './types' 
import { COLLECT_DRAG } from '../../ModalDND';

const itemSource = {
    beginDrag(props) {
        return {
            value: props.item,
            mathType: mathType.value.key,
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