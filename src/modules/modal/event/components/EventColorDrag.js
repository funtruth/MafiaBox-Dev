import React from 'react'
import { DragSource } from 'react-dnd'

import { ItemTypes } from './EventConstants'

const itemSource = {
    beginDrag(props) {
        return {
            hexcode: props.item,
        }
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
}
  
function EventColorDrag(props) {
    const { workspace, setWorkspace, item, connectDragSource } = props
    const { selectedColor } = workspace

    const selected = item === selectedColor

    let handleSelect = (color) => {
        setWorkspace({
            ...workspace,
            selectedColor: color,
        })
    }

    return connectDragSource(
        <div
            className="event-color-drag"
            onClick={() => handleSelect(item)}
            style={{
                backgroundColor: item,
                border: selected && '2px solid #ddd',
            }}
        >
            {selected && <i className="mdi mdi-spellcheck outlined-text"></i>}
        </div>
    );
}

export default DragSource(
    ItemTypes.EVENT_COLOR,
    itemSource,
    collect
)(EventColorDrag);