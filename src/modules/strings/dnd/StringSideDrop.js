import React from 'react'
import { DropTarget } from 'react-dnd'

import { DRAGGABLE_TYPE } from '../types';
import { palette } from '../../components/Standards';

const itemTarget = {
    drop(props, monitor) {
        const didDrop = monitor.didDrop()
        if (didDrop) return;

        const dragItem = monitor.getItem()
        const itemType = monitor.getItemType()
        const { dragIndex } = dragItem

        switch(itemType) {
            case DRAGGABLE_TYPE.string:
                props.move(dragIndex)
                break
            case DRAGGABLE_TYPE.variable:
                props.drop(dragItem)
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
  
function StringSideDrop(props) {
    const { top, bottom, left, right,
        color,
        isOver, canDrop, connectDropTarget } = props
    
    const border = `2px solid ${palette(color || 'rabbit')}`

    const heightStyle={
        top: bottom ? '50%' : 0,
        bottom: top ? '50%' : 0,
        left: right ? '50%' : 0,
        right: left ? '50%' : 0,
        borderTop: top && isOver && border,
        borderBottom: bottom && isOver && border,
        borderLeft: left && isOver && border,
        borderRight: right && isOver && border,
    }

    return connectDropTarget(
        <div
            style={{
                position: 'absolute',
                ...canDrop && heightStyle,
            }}
        >
        </div>
    );
}

export default DropTarget(
    [DRAGGABLE_TYPE.string, DRAGGABLE_TYPE.variable],
    itemTarget,
    collectDrop,
)(StringSideDrop)