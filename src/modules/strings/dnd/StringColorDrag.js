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
    const { path, updateGeneral, color, setColor, activeKey, item, connectDragSource } = props

    const selected = item === color

    let handleSelect = (color) => {
        if (activeKey !== '') {
            updateGeneral([...path, 'byId', activeKey], {
                color: item,
            })
        }
        setColor(color)
    }

    return connectDragSource(
        <div
            className="event-color-drag"
            onClick={() => handleSelect(item)}
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