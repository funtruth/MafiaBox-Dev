import React from 'react'
import { DragSource } from 'react-dnd'

import { mathType } from '../../common/types'

import { COLLECT_DRAG } from '../../common/arrows';

import { Row, Tag, Text } from '../../components/Common';

const itemSource = {
    beginDrag(props) {
        const { item } = props

        return {
            math: mathType.operation,
            mathOperator: item.key,
        }
    }
}
  
function BasicOpDrag(props) {
    const { item, connectDragSource } = props
    
    return connectDragSource(
        <div style={{margin: 4}}>
            <Row bg="charcoal" y="c">
                <Tag bg="discord">x</Tag>
                <Text>{item.char}</Text>
                <Tag bg="discord">y</Tag>
            </Row>
        </div>
    );
}

export default DragSource(
    mathType.operation,
    itemSource,
    COLLECT_DRAG,
)(BasicOpDrag);