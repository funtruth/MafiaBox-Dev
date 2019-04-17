import React from 'react'
import { DropTarget } from 'react-dnd'
import * as helpers from '../../../common/helpers'

import {
    ItemTypes,
    mathType,
    DEFAULT_ASSIGN,
} from './types'
import { DropClick } from '../../../components/Common';

const itemTarget = {
    drop(props, monitor) {
        const item = monitor.getItem()
        
        props.setWorkspace(helpers.updateByPath(
            props.subpath,
            {
                ...DEFAULT_ASSIGN,
                ...item,
            },
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

function ValueDrop(props) {
    const { connectDropTarget, isOver, children, assign } = props
    
    if (assign.mathType === mathType.number) {
        return connectDropTarget(
            <div>
                <DropClick
                    className="basic-op-bubble"
                    style={{
                        color: isOver && '#fff',
                        backgroundColor: isOver && '#6279CA',
                    }}
                >
                    {children}
                </DropClick>
            </div>
        );
    }
    
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
    [ItemTypes.OPERATION, ItemTypes.VALUE],
    itemTarget,
    collect
)(ValueDrop);