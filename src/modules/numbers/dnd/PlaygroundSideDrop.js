import React from 'react'
import { DropTarget } from 'react-dnd'

import { mathType } from '../../common/types';

const itemTarget = {
    drop(props, monitor) {
        const item = monitor.getItem()
        const didDrop = monitor.didDrop()
        
        if (didDrop) return;
        const { side } = props

        const dropSide = side === 'right' ? 'left' : 'right'

        props.wrapValue(item, dropSide)
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
    }
}
  
function PlaygroundSideDrop(props) {
    const { connectDropTarget, isOver, canDrop, side, source } = props
    
    //if no math has been added, return null
    //this is because we want to show the entire PlaygroundDrop instead of sides
    if (!source || !canDrop) return null

    return connectDropTarget(
        <div
            className={`playground-${side}`}
            style={{ backgroundColor: isOver && 'rgba(70, 73, 78, 1)' }}
        />
    );
}

export default DropTarget(
    mathType.operation,
    itemTarget,
    collect
)(PlaygroundSideDrop);