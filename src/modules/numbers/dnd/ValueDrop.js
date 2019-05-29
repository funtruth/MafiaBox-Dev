import React from 'react'
import { DropTarget } from 'react-dnd'

import {
    mathType,
} from '../../common/types'

import { DropClick, Tag } from '../../components/Common';

const itemTarget = {
    drop(props, monitor) {
        const { mathItem, position } = props
        const item = monitor.getItem()

        props.nestValue(mathItem, item, position)
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
            <DropClick>
                <Tag
                    color={isOver ? 'white' : 'whitish'}
                    bg={isOver ? 'purple' : 'charcoal'}
                >
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