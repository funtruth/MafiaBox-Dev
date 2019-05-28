import React from 'react'
import { DropTarget } from 'react-dnd'

import { ITEM_TYPE } from '../types';

const itemTarget = {
    drop(props, monitor) {
        const didDrop = monitor.didDrop()
        if (didDrop) return;

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
    const { connectDropTarget, isOver } = props

    return connectDropTarget(
        <div
            className="string-playground-click"
            style={{flex: 1}}
            bg={isOver && 'red'}
        >
        </div>
    );
}

export default DropTarget(
    [ITEM_TYPE.variable],
    itemTarget,
    collectDrop,
)(EventStringDragDrop)