import React from 'react'
import * as helpers from '../../../common/helpers'

import { ItemTypes } from './Constants'
import { DropTarget } from 'react-dnd'

import { dropdownType } from '../../../dropdown/types'
import { updateSourceType } from '../../../common/types'

const itemTarget = {
    drop(props, monitor) {
        const item = monitor.getItem()
        props.setPlayground(helpers.updateByPath(props.subpath, item.opInfo, props.playground))
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true }),
    }
}
  
function ValueDroppable(props) {
    const { connectDropTarget, isOver, children, subpath } = props
    return connectDropTarget(
        <div
            className="basic-op-bubble app-onclick"
            menu-type={dropdownType.pickOp}
            app-onclick-props={JSON.stringify({
                path: ['attach', 'assign'],
                subpath,
                updateSource: updateSourceType.topModal,
            })}
            style={{
                color: isOver && '#fff',
                backgroundColor: isOver && '#6279CA',
            }}
        >
            {children}
        </div>
    );
}

export default DropTarget([ItemTypes.BASIC_OP, ItemTypes.VALUE], itemTarget, collect)(ValueDroppable);