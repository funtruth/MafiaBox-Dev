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
            value: props.value,
            mathType: mathType.value.key,
        }
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
    COLLECT_DRAG,
)(ValueDrag);