import React from 'react'
import { DragSource, DropTarget } from 'react-dnd'

import { ItemTypes } from './EventConstants'

const itemSource = {
    beginDrag(props) {
        return {
            dragIndex: props.index,
        }
    }
}

const itemTarget = {
    drop(props, monitor) {
        const didDrop = monitor.didDrop()
        if (didDrop) return;

        const item = monitor.getItem()
        const itemType = monitor.getItemType()

        const { eventIndex, workspace, index } = props
        let wsClone = Object.assign({}, workspace)
        let wsString = wsClone.eventArr[eventIndex].stringArr

        switch(itemType) {
            case ItemTypes.EVENT_FUNCTION:
                wsString[index].color = item.hexcode
                props.setWorkspace(wsClone)
                break
            case ItemTypes.EVENT_STRING:
                console.log("thats a string!")
                break
            default:
        }
    },

    canDrop(props, monitor) {
        const item = monitor.getItem()
        if (item.dragIndex === props.index) return false
        return true
    }
}

function collectDrop(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
    }
}

function collectDrag(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
}
  
function EventFunctionDragDrop(props) {
    const { item, connectDragSource, connectDropTarget, canDrop, isOver } = props
    const { functionKey } = item

    return connectDragSource(connectDropTarget(
        <div
            className="event-playground-item"
            style={{
                color: '#fff',
                backgroundColor: '#992600',
                pointerEvents: 'all',
            }}
        >
            {functionKey}
        </div>
    ));
}

export default DragSource(
    ItemTypes.EVENT_STRING,
    itemSource,
    collectDrag,
)(DropTarget(
    [ItemTypes.EVENT_UID],
    itemTarget,
    collectDrop,
)(EventFunctionDragDrop));


