import React from 'react'
import * as helpers from '../../../common/helpers'

import { ItemTypes } from './Constants'
import { DropTarget } from 'react-dnd'

const itemTarget = {
    drop(props, monitor) {
        const item = monitor.getItem()
        props.setWorkspace(helpers.updateByPath(props.subpath, item.opInfo, props.workspace))
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true }),
    }
}
  
function ValueDrop(props) {
    const { connectDropTarget, isOver, children } = props
    return connectDropTarget(
        <div
            className="basic-op-bubble"
            style={{
                color: isOver && '#fff',
                backgroundColor: isOver && '#6279CA',
            }}
        >
            {children}
        </div>
    );
}

export default DropTarget(
    [ItemTypes.BASIC_OP,ItemTypes.VALUE],
    itemTarget,
    collect
)(ValueDrop);