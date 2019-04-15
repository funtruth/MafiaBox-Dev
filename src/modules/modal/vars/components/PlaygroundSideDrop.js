import React from 'react'
import { DropTarget } from 'react-dnd'

import {
    mathType,
    ItemTypes,
    DEFAULT_BASIC_OP_ASSIGN,
} from './types'

const itemTarget = {
    drop(props, monitor) {
        const item = monitor.getItem()
        const didDrop = monitor.didDrop()
        
        if (didDrop) return;
        const dropSide = props.side === 'right' ? 'left' : 'right'
        const newWorkspace = {
            ...props.workspace,
            assign: {
                ...DEFAULT_BASIC_OP_ASSIGN,
                mathOperatorType: item.mathOperatorType,
                [dropSide]: props.workspace.assign,
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
    
    if (!opInfo || (opInfo.mathType === mathType.NaN.key)) return null

    return connectDropTarget(
        <div
            className={`playground-${side}`}
            style={{ backgroundColor: isOver && 'rgba(70, 73, 78, 1)' }}
        />
    );
}

export default DropTarget(
    ItemTypes.OPERATION,
    itemTarget,
    collect
)(PlaygroundSideDrop);