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
    const { workspace, item, connectDragSource } = props
    const { selectedColor } = workspace

    const selected = item === selectedColor
    
    return connectDragSource(
        <div
            className="event-color-drag color-check"
            style={{
                backgroundColor: item,
            }}
        >
            {selected && <i className="mdi mdi-check color-check"></i>}
        </div>
    );
}

export default DragSource(
    ItemTypes.EVENT_COLOR,
    itemSource,
    collect
)(EventColorDrag);