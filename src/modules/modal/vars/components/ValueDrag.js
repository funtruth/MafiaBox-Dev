import React from 'react'
import { DragSource } from 'react-dnd'

import {
    ItemTypes,
} from './types' 
import { COLLECT_DRAG } from '../../ModalDND';

import {
    Tag,
} from '../../../components/Common';

const itemSource = {
    beginDrag(props) {
        return {
            mathType: props.mathType,
            value: props.text,
        }
    }
}

function ValueDrag(props) {
    const { text, connectDragSource } = props
    return connectDragSource(
        <div><Tag>{text}</Tag></div>
    );
}

export default DragSource(
    ItemTypes.VALUE,
    itemSource,
    COLLECT_DRAG,
)(ValueDrag);