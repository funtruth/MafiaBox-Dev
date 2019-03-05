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
  
function EventBarItemDrag(props) {
    const { item, index, connectDragSource, onClick } = props
    
    let char = '*'
    if (item.stringArr[0]) {
        char = item.stringArr[0].string && item.stringArr[0].string.charAt(0)
    }

    return connectDragSource(
        <div
            className="dashboard-item"
            onClick={() => onClick(index)}
        >
            {char}
        </div>
    );
}

export default DragSource(
    ItemTypes.EVENT_STRING,
    itemSource,
    collect
)(EventBarItemDrag);