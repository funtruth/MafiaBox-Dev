import React from 'react'
import * as helpers from '../../../common/helpers'
import { DropTarget } from 'react-dnd'

import { ItemTypes } from './types'

const itemTarget = {
    drop(props, monitor) {
        const didDrop = monitor.didDrop()
        if (didDrop) return;

        const item = monitor.getItem()
        props.setWorkspace(helpers.updateByPath(
            props.subpath,
            item,
            props.workspace,
        ))
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true }),
    }
}
  
function BasicOpDrop(props) {
    const { connectDropTarget, isOver, children } = props
    return connectDropTarget(
        <div className="basic-op" style={{ backgroundColor: isOver && '#6279CA' }}>
            {children}
        </div>
    );
}

export default DropTarget(
    ItemTypes.OPERATION,
    itemTarget,
    collect
)(BasicOpDrop);