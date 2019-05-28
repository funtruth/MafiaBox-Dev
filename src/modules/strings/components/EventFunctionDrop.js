import React from 'react'
import { DropTarget } from 'react-dnd'

import { ItemTypes, PartTypes } from './EventConstants'

const itemTarget = {
    drop(props, monitor) {
        const didDrop = monitor.didDrop()
        if (didDrop) return;

        const dragItem = monitor.getItem()
        const itemType = monitor.getItemType()

        const { eventIndex, workspace, index, item } = props
        const { functionKey } = item
        let wsClone = Object.assign({}, workspace)

        switch(itemType) {
            case ItemTypes.EVENT_UID:
                Object.assign(wsClone.eventArr[eventIndex].stringArr[index], {
                    functionKey,
                    string: dragItem.item.key,
                    partType: PartTypes.function,
                })
                props.setWorkspace(wsClone)
                break
            case ItemTypes.EVENT_COLOR:
                Object.assign(wsClone.eventArr[eventIndex].stringArr[index], {
                    color: dragItem.hexcode,
                })
                props.setWorkspace(wsClone)
                break
            default:
        }
    },
}

function collectDrop(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true }),
    }
}
  
function EventFunctionDrop(props) {
    const { item, connectDropTarget } = props
    const { string, color } = item

    return connectDropTarget(
        <div
            className="event-function-bubble"
            style={{
                backgroundColor: 'rgba(40, 43, 48,1)',
                color: color || '#d6d6d6',
            }}
        >
            {string || '...'}
        </div>
    );
}

export default DropTarget(
    [ItemTypes.EVENT_UID, ItemTypes.EVENT_COLOR],
    itemTarget,
    collectDrop,
)(EventFunctionDrop)