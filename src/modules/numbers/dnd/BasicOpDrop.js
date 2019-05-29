import React from 'react'
import { DropTarget } from 'react-dnd'

import { mathType } from '../../common/types';

const itemTarget = {
    drop(props, monitor) {
        const { mathKey } = props
        
        const didDrop = monitor.didDrop()
        if (didDrop) return;

        const item = monitor.getItem()
        props.changeValue(mathKey, item)
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
    mathType.operation,
    itemTarget,
    collect
)(BasicOpDrop);