import React from 'react'
import * as helpers from '../../../common/helpers'

import { ItemTypes } from './Constants'
import { DropTarget } from 'react-dnd'

import ActiveOp from './ActiveOp';
import PlaygroundSideDrop from './PlaygroundSideDrop';

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
  
function PlaygroundDrop(props) {
    const { connectDropTarget, isOver, opInfo } = props
    
    return connectDropTarget(
        <div className="playground" style={{ backgroundColor: isOver && 'rgba(70, 73, 78, 1)' }}>
            <PlaygroundSideDrop side="left" opInfo={opInfo}/>
            <PlaygroundSideDrop side="right" opInfo={opInfo}/>
            <div className="playground-children">
                <div
                    className="row -x-p"
                    style={{
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <ActiveOp {...props}/>
                </div>
            </div>
            <div
                className="dashboard-section-title"
                style={{
                    color: isOver && '#fff',
                    position: 'relative',
                    top: 8,
                }}
            >
                set variable to
            </div>
        </div>
    );
}

export default DropTarget(
    [ItemTypes.BASIC_OP, ItemTypes.VALUE],
    itemTarget,
    collect
)(PlaygroundDrop);