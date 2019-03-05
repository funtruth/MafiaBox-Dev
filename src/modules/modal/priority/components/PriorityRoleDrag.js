import React from 'react'
import { DragSource } from 'react-dnd'

import { ItemTypes } from './PriorityConstants'
import { COLLECT_DRAG } from '../../ModalDND';

const itemSource = {
    beginDrag(props) {
        const { xIndex, yIndex } = props
        return {
            itemXIndex: xIndex,
            itemYIndex: yIndex,
        }
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
    COLLECT_DRAG,
)(PriorityRoleDrag);