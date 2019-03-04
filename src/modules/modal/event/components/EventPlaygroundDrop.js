import React, { useState } from 'react'
import { DropTarget } from 'react-dnd'

import { ItemTypes } from './EventConstants'

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
    },
}

function collectDrop(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
    }
}
  
function EventStringDragDrop(props) {
    let [dropzone, setDropzone] = useState('')

    const { connectDropTarget } = props

    let handleDrag = (e) => {
        const divHeight = e.target.offsetHeight
        const yFromTop = e.nativeEvent.offsetY
        
        if(yFromTop > divHeight / 2) {
            setDropzone('bottom')
        } else {
            setDropzone('top')
        }
    }

    let handleDragLeave = () => setDropzone('')

    let borderStyle = {
        padding: '4px 0px',
    }

    if(dropzone === 'top') {
        borderStyle = {
            borderTop: '2px solid red',
            padding: '2px 0px 4px 0px',
        }
    } else if (dropzone === 'bottom') {
        borderStyle = {
            borderBottom: '2px solid red',
            padding: '4px 0px 2px 0px',
        }
    }

    return connectDropTarget(
        <div
            className="event-playground-item-case"
            style={borderStyle}
            onDragOver={handleDrag}
            onDragLeave={handleDragLeave}
        >
            {props.children}
        </div>
    );
}

export default DropTarget(
    [ItemTypes.EVENT_STRING],
    itemTarget,
    collectDrop,
)(EventStringDragDrop)


