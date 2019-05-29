import React from 'react'
import { DragSource } from 'react-dnd'

import { mathType } from '../../common/types';

import { COLLECT_DRAG } from '../../common/arrows';

import {
    Tag,
} from '../../components/Common';

const itemSource = {
    beginDrag(props) {
        return {
            mathType: props.mathType,
            item: props.item,
        }
    }
}

function ValueDrag(props) {
    const { item, connectDragSource } = props

    return connectDragSource(
        <div><Tag>{item.key}</Tag></div>
    );
}

export default DragSource(
    mathType.value,
    itemSource,
    COLLECT_DRAG,
)(ValueDrag);