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
        <div
            className="playground"
            style={{backgroundColor: highlight && 'rgba(70, 73, 78, 1)'}}
        >
            <PlaygroundSideDrop {...props} side="left"/>
            <PlaygroundSideDrop {...props} side="right"/>
            <Text
                className="playground-title"
                color={highlight ? 'white' : 'whitish'}
            >
                Value
            </Text>
            <Row className="playground-erase">
                <Tag
                    onClick={props.resetWorkspace}
                    icon="mdi mdi-reload"
                >
                    Reset
                </Tag>
                <Tag
                    onClick={props.clearWorkspace}
                    icon="mdi mdi-eraser"
                >
                    Clear
                </Tag>
            </Row>
            <ActiveOp {...props} mathKey={source}/>
        </div>
    );
}

export default DropTarget(
    [mathType.operation, mathType.value],
    itemTarget,
    collect
)(PlaygroundDrop);