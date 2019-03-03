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
  
function EventColorDrag(props) {
    const { item, connectDragSource } = props
    const { hexcode } = item

    return connectDragSource(
        <div
            className="event-color-drag"
            style={{
                backgroundColor: hexcode,
            }}
        />
    );
}

export default DragSource(
    ItemTypes.EVENT_COLOR,
    itemSource,
    collect
)(EventColorDrag);