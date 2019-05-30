import React from 'react'
import { DropTarget } from 'react-dnd'

import { mathType } from '../../common/types';

import ActiveOp from '../components/ActiveOp';
import PlaygroundSideDrop from './PlaygroundSideDrop';
import {
    Row,
    Tag,
    Text,
} from '../../components/Common';

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
        <div>
            <Row>
                <Text
                    color={highlight ? 'white' : 'whitish'}
                    style={{
                        marginRight: 'auto',
                    }}
                >
                    Value
                </Text>
                <Tag
                    onClick={props.clearSlate}
                    icon="mdi mdi-eraser"
                >
                    Clear
                </Tag>
            </Row>
            <div
                className="playground"
                style={{
                    backgroundColor: highlight && 'rgba(70, 73, 78, 1)',
                    padding: '20px 0px',
                }}
            >
                <PlaygroundSideDrop {...props} side="left"/>
                <PlaygroundSideDrop {...props} side="right"/>
                <ActiveOp {...props} mathKey={source}/>
            </div>
        </div>
    );
}

export default DropTarget(
    [mathType.operation, mathType.value],
    itemTarget,
    collect
)(PlaygroundDrop);