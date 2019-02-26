import React from 'react'
import * as helpers from '../../../common/helpers'
import { DropTarget } from 'react-dnd'

import { ItemTypes } from './Constants'
import { opType, DEFAULT_ASSIGN } from './ops'

import ActiveOp from './ActiveOp';
import PlaygroundSideDrop from './PlaygroundSideDrop';

const itemTarget = {
    drop(props, monitor) {
        const item = monitor.getItem()
        const didDrop = monitor.didDrop()

        if (didDrop) return;
        switch(item.opType) {
            case opType.basicOp.key:
                props.setWorkspace(helpers.updateByPath(props.subpath,
                    {...item.opInfo, left: DEFAULT_ASSIGN, right: DEFAULT_ASSIGN}, props.workspace))
                break
            case opType.value.key:
                props.setWorkspace(helpers.updateByPath(props.subpath, item.opInfo, props.workspace))
                break
            default:
        }
    },

    canDrop(props) {
        const { opInfo } = props
        const droppable = opInfo.opType === opType.NaN.key
        return droppable
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true }),
    }
}
  
function PlaygroundDrop(props) {
    const { connectDropTarget, isOver, opInfo } = props
    const highlight = isOver && opInfo.opType === opType.NaN.key

    return connectDropTarget(
        <div className="playground" style={{ backgroundColor: highlight && 'rgba(70, 73, 78, 1)' }}>
            <PlaygroundSideDrop side="left" {...props}/>
            <PlaygroundSideDrop side="right" {...props}/>
            <div className="playground-title" style={{ color: highlight && '#fff' }}>set variable to</div>
            <div style={{ margin: '26px 16px' }}><ActiveOp {...props}/></div>
        </div>
    );
}

export default DropTarget(
    [ItemTypes.BASIC_OP, ItemTypes.VALUE],
    itemTarget,
    collect
)(PlaygroundDrop);