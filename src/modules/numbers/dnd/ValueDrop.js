import React from 'react'
import { DropTarget } from 'react-dnd'

import {
    mathType, dropdownType,
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
    const { connectDropTarget, isOver, children,
        path, mathKey, mathItem, position } = props

    const renderItem = () => {
        //empty
        if (!mathKey) {
            return (
                <DropClick
                    dropdown={dropdownType.pickNumValue}
                    params={{
                        path: [...path, 'byId'],
                        mathKey: '',
                        item: mathItem,
                        side: position,
                    }}
                >
                    <Tag
                        color={isOver ? 'white' : 'whitish'}
                        bg={isOver ? 'purple' : 'charcoal'}
                    >
                        {children}
                    </Tag>
                </DropClick>
            )
        }

        if (mathItem.math === mathType.constant) {
            return (
                <DropClick
                    dropdown={dropdownType.pickNumValue}
                    params={{
                        path: [...path, 'byId', mathKey, 'value'],
                        mathKey,
                        item: mathItem,
                        side: position,
                    }}
                >
                    <Tag
                        color={isOver ? 'white' : 'whitish'}
                        bg={isOver ? 'purple' : 'charcoal'}
                    >
                        {children}
                    </Tag>
                </DropClick>
            )
        }

        return (
            <Tag
                color={isOver ? 'white' : 'whitish'}
                bg={isOver ? 'purple' : 'charcoal'}
            >
                {children}
            </Tag>
        );
    }

    return connectDropTarget(
        <div style={{position: 'relative'}}>
            {renderItem()}
        </div>
    );
}

export default DropTarget(
    [mathType.operation, mathType.value],
    itemTarget,
    collect
)(ValueDrop);