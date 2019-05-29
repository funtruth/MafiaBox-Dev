import React from 'react'
import { DropTarget } from 'react-dnd'

import { mathType } from '../../common/types';

import ActiveOp from '../components/ActiveOp';
import PlaygroundSideDrop from './PlaygroundSideDrop';

const itemTarget = {
    drop(props, monitor) {
        const didDrop = monitor.didDrop()
        if (didDrop) return;

        const item = monitor.getItem()

        props.initValue(item)
    },

    //can only drop if empty.
    canDrop(props) {
        const { source } = props
        return !source
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
    }
}
  
function PlaygroundDrop(props) {
    const { source, connectDropTarget, isOver, canDrop } = props
    const highlight = isOver && canDrop

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
            <ActiveOp {...props} mathKey={source}/>
        </div>
    );
}

export default DropTarget(
    [mathType.operation, mathType.value],
    itemTarget,
    collect
)(PlaygroundDrop);