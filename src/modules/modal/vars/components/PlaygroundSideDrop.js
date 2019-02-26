import React from 'react'

import { ItemTypes } from './Constants'
import { opType, DEFAULT_ASSIGN } from './ops'
import { DropTarget } from 'react-dnd'

const itemTarget = {
    drop(props, monitor) {
        const item = monitor.getItem()
        const didDrop = monitor.didDrop()
        
        if (didDrop) return;
        const dropSide = props.side === 'right' ? 'left' : 'right'
        const newWorkspace = {
            ...props.workspace,
            assign: {
                ...DEFAULT_ASSIGN,
                opType: opType.basicOp.key,
                basicOpType: item.basicOpType,
                [dropSide]: props.workspace.assign,
                [props.side]: DEFAULT_ASSIGN,
            }
        }
        props.setWorkspace(newWorkspace)
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true }),
    }
}
  
function PlaygroundSideDrop(props) {
    const { connectDropTarget, isOver, side, opInfo } = props
    
    if (opInfo.opType === opType.NaN.key) return null

    return connectDropTarget(
        <div
            className={`playground-${side}`}
            style={{ backgroundColor: isOver && 'rgba(70, 73, 78, 1)' }}
        />
    );
}

export default DropTarget(
    ItemTypes.BASIC_OP,
    itemTarget,
    collect
)(PlaygroundSideDrop);