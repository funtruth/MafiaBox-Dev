import React from 'react'
import { DragSource, DropTarget } from 'react-dnd'

import { ItemTypes } from './EventConstants'

const itemSource = {
    beginDrag(props) {
        return {}
    }
}

const itemTarget = {
    drop(props, monitor) {
        const didDrop = monitor.didDrop()
        if (didDrop) return;

        const item = monitor.getItem()
        const itemType = monitor.getItemType()

        switch(itemType) {
            case ItemTypes.EVENT_COLOR:
                console.log("thats a color!")
                break
            case ItemTypes.EVENT_STRING:
                console.log("thats a string!")
                break
            default:
        }
    }
}

function collectDrop(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true }),
    }
}

function collectDrag(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
}
  
function EventPlaygroundDrag(props) {
    const { item, connectDragSource, connectDropTarget } = props
    const { string, color } = item

    return connectDragSource(connectDropTarget(
        <div
            className="event-playground-item"
            style={{
                color: color || '#d6d6d6',
            }}
        >
            {string}
        </div>
    ));
}

export default DragSource(
    ItemTypes.EVENT_STRING,
    itemSource,
    collectDrag,
)(DropTarget(
    [ItemTypes.EVENT_COLOR, ItemTypes.EVENT_STRING],
    itemTarget,
    collectDrop,
)(EventPlaygroundDrag));


