import React from 'react'
import { DropTarget } from 'react-dnd'

import { ItemTypes } from './PriorityConstants'

const itemTarget = {
    drop(props, monitor) {
        const { workspace, index } = props

        const item = monitor.getItem()
        const { itemXIndex, itemYIndex } = item

        if (index === itemYIndex) return;

        let workspaceClone = workspace.slice()

        const [removed] = workspaceClone[itemYIndex].splice(itemXIndex, 1)
        workspaceClone[index].push(removed)

        props.setWorkspace(workspaceClone)
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true }),
    }
}

function PriorityRoleDrop(props) {
    const { connectDropTarget, isOver, children } = props
    
    return connectDropTarget(
        <div
            className="priority-role-drop"
            style={{
                backgroundColor: isOver && 'rgba(70, 73, 78, 1)',
            }}
        >
            {children}
        </div>
    );
}

export default DropTarget(
    ItemTypes.ROLE,
    itemTarget,
    collect
)(PriorityRoleDrop);