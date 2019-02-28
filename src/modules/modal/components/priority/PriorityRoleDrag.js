import React from 'react'
import { DragSource } from 'react-dnd'

import { ItemTypes } from './PriorityConstants'

const itemSource = {
    beginDrag(props) {
        const { xIndex, yIndex } = props
        return {
            itemXIndex: xIndex,
            itemYIndex: yIndex,
        }
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
}
  
function PriorityRoleDrag(props) {
    const { item, connectDragSource } = props
    return connectDragSource(
        <div className="priority-role-drag">
            {item.title || 'Untitled'}
        </div>
    );
}

export default DragSource(
    ItemTypes.ROLE,
    itemSource,
    collect
)(PriorityRoleDrag);