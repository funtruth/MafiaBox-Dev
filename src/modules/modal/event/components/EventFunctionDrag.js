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
  
function EventFunctionDrag(props) {
    const { item, connectDragSource } = props
    
    return connectDragSource(
        <div
            className="event-function"
        >
            {item.key}
        </div>
    );
}

export default DragSource(
    ItemTypes.EVENT_FUNCTION,
    itemSource,
    collect
)(EventFunctionDrag);