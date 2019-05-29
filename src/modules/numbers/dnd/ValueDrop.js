import React from 'react'
import { DropTarget } from 'react-dnd'

import {
    mathType,
} from '../../common/types'

import { DropClick, Tag } from '../../components/Common';

const itemTarget = {
    drop(props, monitor) {
        const { mathKey } = props
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

function ValueDrop(props) {
    const { connectDropTarget, isOver, children } = props
    
    return connectDropTarget(
        <div>
            <DropClick
                style={{
                    color: isOver && '#fff',
                    backgroundColor: isOver && '#6279CA',
                }}
            >
                <Tag>
                    {children}
                </Tag>
            </DropClick>
        </div>
    );
}

export default DropTarget(
    [mathType.operation, mathType.value],
    itemTarget,
    collect
)(ValueDrop);