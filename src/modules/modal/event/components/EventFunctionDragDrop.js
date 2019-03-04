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
            case ItemTypes.EVENT_COLOR:
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
    const { item, index, stringIndex, workspace, setWorkspace, setText,
        connectDragSource, connectDropTarget, canDrop, isOver } = props
    const { string, color } = item

    let handleSelect = () => {
        setWorkspace({
            ...workspace,
            stringIndex: index,
            selectedColor: color,
        })
        setText(string)
        document.getElementById('event-editor-textarea').focus()
    }

    return connectDragSource(connectDropTarget(
        <div
            className="event-playground-item"
            onClick={handleSelect}
            style={{
                color: color || '#d6d6d6',
                backgroundColor: '#ff8c1a',
                pointerEvents: 'all',
            }}
            onBlur={() => alert('no')}
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
)(EventFunctionDragDrop));


