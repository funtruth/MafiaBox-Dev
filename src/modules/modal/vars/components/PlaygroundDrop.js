import React from 'react'
import './Playground.css'
import * as helpers from '../../../common/helpers'
import { DropTarget } from 'react-dnd'

import {
    mathType,
    DEFAULT_BASIC_OP_ASSIGN,
    ItemTypes,
} from './types'

import ActiveOp from './ActiveOp';
import PlaygroundSideDrop from './PlaygroundSideDrop';

const itemTarget = {
    drop(props, monitor) {
        const didDrop = monitor.didDrop()
        if (didDrop) return;

        const item = monitor.getItem()
        const itemType = monitor.getItemType()

        switch(itemType) {
            case ItemTypes.OPERATION:
                props.setWorkspace(helpers.updateByPath(
                    props.subpath,
                    Object.assign({}, DEFAULT_BASIC_OP_ASSIGN, item.opInfo),
                    props.workspace,
                ))
                break
            case ItemTypes.VALUE:
                props.setWorkspace(helpers.updateByPath(
                    props.subpath,
                    item,
                    props.workspace,
                ))
                break
            default:
        }
    },

    canDrop(props) {
        const { opInfo } = props
        const droppable = opInfo.mathType === mathType.NaN.key
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
    const { connectDropTarget, isOver, assign } = props
    const highlight = isOver && !assign.mathType

    return connectDropTarget(
        <div className="playground" style={{ backgroundColor: highlight && 'rgba(70, 73, 78, 1)' }}>
            <PlaygroundSideDrop side="left" {...props}/>
            <PlaygroundSideDrop side="right" {...props}/>
            <div className="playground-title" style={{ color: highlight && '#fff' }}>set variable to</div>
            <div className="playground-erase">
                <div onClick={props.resetWorkspace} style={{ marginRight: 8, cursor: 'pointer' }}>
                    <i className="mdi mdi-reload" style={{ marginRight: 2 }}></i>
                    reset
                </div>
                <div onClick={props.clearWorkspace} style={{ cursor: 'pointer' }}>
                    <i className="mdi mdi-eraser" style={{ marginRight: 2 }}></i>
                    clear
                </div>
            </div>
            <div style={{ margin: '26px 16px' }}><ActiveOp {...props}/></div>
        </div>
    );
}

export default DropTarget(
    [ItemTypes.OPERATION, ItemTypes.VALUE],
    itemTarget,
    collect
)(PlaygroundDrop);