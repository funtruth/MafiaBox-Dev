import React from 'react'
import { DragSource } from 'react-dnd'

import { ItemTypes } from './EventConstants'

const itemSource = {
    beginDrag(props) {
        return {}
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
}
  
function EventPlaygroundDrag(props) {
    const { children, connectDragSource } = props

    return connectDragSource(
        <div
            className="event-playground-item"
        >
            {children}
        </div>
    );
}

export default DragSource(
    ItemTypes.EVENT_ITEM,
    itemSource,
    collect
)(EventPlaygroundDrag);