import React from 'react'
import { DropTarget } from 'react-dnd'

import {
    dropdownType, parseType,
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
                        bg={isOver ? 'purple' : 'discord'}
                    >
                        {children}
                    </Tag>
                </DropClick>
            )
        }

        if (mathItem.parseBy === parseType.variable || mathItem.parseBy === parseType.constant) {
            return (
                <DropClick
                    dropdown={dropdownType.pickNumValue}
                    context={dropdownType.replaceWildcard}
                    params={{
                        path: [...path, 'byId', mathKey],
                        mathKey,
                        item: mathItem,
                        side: position,
                    }}
                >
                    <Tag
                        color={isOver ? 'white' : 'whitish'}
                        bg={isOver ? 'purple' : 'discord'}
                    >
                        {children}
                    </Tag>
                </DropClick>
            )
        }

        return (
            <Tag
                color={isOver ? 'white' : 'whitish'}
                bg={isOver ? 'purple' : 'discord'}
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
    [parseType.operation, parseType.variable],
    itemTarget,
    collect
)(ValueDrop);