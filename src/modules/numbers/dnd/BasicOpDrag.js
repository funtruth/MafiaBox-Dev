import React from 'react'
import { DragSource } from 'react-dnd'

import { parseType } from '../../common/types'

import { COLLECT_DRAG } from '../../common/arrows';

import { Tag, Text } from '../../components/Common';
import BasicOp from '../components/BasicOp';
import { LOGIC_ITEM_VAR_OPERATION } from '../../logic/defaults';

const itemSource = {
    beginDrag(props) {
        const { item } = props

        return {
            parseBy: parseType.operation,
            display: item.display,
            value: {
                ...LOGIC_ITEM_VAR_OPERATION,
                operator: item.key,
            }
        }
    }
}
  
function BasicOpDrag(props) {
    const { item, connectDragSource } = props
    
    return connectDragSource(
        <div>
            <BasicOp color={item.color}>
                <Tag bg="discord">x</Tag>
                <Text>{item.display}</Text>
                <Tag bg="discord">y</Tag>
            </BasicOp>
        </div>
    );
}

export default DragSource(
    parseType.operation,
    itemSource,
    COLLECT_DRAG,
)(BasicOpDrag);