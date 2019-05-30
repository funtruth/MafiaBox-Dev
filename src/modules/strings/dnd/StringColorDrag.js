import React from 'react'
import { DragSource } from 'react-dnd'

import { DRAGGABLE_TYPE } from '../types';

import { COLLECT_DRAG } from '../../common/arrows';

const itemSource = {
    beginDrag(props) {
        return {
            hexcode: props.item,
        }
    }
}
  
function StringColorDrag(props) {
    const { color, item, connectDragSource } = props

    const selected = item === color

    return connectDragSource(
        <div
            className="event-color-drag"
            onClick={() => props.pickColor(item)}
            style={{
                backgroundColor: item,
                border: selected ? '2px solid #ddd' : '2px solid #666',
            }}
        >
            {selected &&
                <i className="mdi mdi-spellcheck outlined-text"></i>
            }
        </div>
    );
}

export default DragSource(
    DRAGGABLE_TYPE.color,
    itemSource,
    COLLECT_DRAG,
)(StringColorDrag);