import React from 'react'
import * as helpers from '../../../common/helpers'

import { ItemTypes } from './Constants'
import { DropTarget } from 'react-dnd'

const itemTarget = {
    drop(props, monitor) {
        const item = monitor.getItem()
        const didDrop = monitor.didDrop()

        if (didDrop) return;
        props.setPlayground(helpers.updateByPath(props.subpath, item, props.playground))
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true }),
    }
}
  
function BasicOpDroppable(props) {
    const { connectDropTarget, isOver, children } = props
    return connectDropTarget(<div className="basic-op" style={{ backgroundColor: isOver && '#6279CA' }}>{children}</div>);
}

export default DropTarget(ItemTypes.BASIC_OP, itemTarget, collect)(BasicOpDroppable);