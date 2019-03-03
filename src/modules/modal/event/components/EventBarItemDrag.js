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
    const { item, onClick, connectDragSource } = props

    return connectDragSource(
        <div
            className="dashboard-item"
            onClick={() => onClick(item)}
        >
            {item.string.charAt(0)}
        </div>
    );
}

export default DragSource(
    ItemTypes.EVENT_ITEM,
    itemSource,
    collect
)(EventBarItemDrag);