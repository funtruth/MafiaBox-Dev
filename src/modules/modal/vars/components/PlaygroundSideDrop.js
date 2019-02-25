import React from 'react'
import * as helpers from '../../../common/helpers'

import { ItemTypes } from './Constants'
import { opType } from './ops'
import { DropTarget } from 'react-dnd'

const itemTarget = {
    drop(props, monitor) {
        const item = monitor.getItem()
        const didDrop = monitor.didDrop()

        if (didDrop) return;
        props.setWorkspace(helpers.updateByPath(props.subpath, item.opInfo, props.workspace))
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
        >

        </div>
    );
}

export default DropTarget(
    ItemTypes.BASIC_OP,
    itemTarget,
    collect
)(PlaygroundSideDrop);