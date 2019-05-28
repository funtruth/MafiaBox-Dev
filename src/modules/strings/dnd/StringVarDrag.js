import React from 'react'
import { DragSource } from 'react-dnd'

import { DRAGGABLE_TYPE } from '../types';

import { COLLECT_DRAG } from '../../common/arrows';

import { Tag } from '../../components/Common';

const itemSource = {
    beginDrag(props) {
        return {
            ...props.item,
            isWild: props.isWild,
        }
    }
}
  
function EventVarDrag(props) {
    const { item, connectDragSource } = props
    
    return connectDragSource(
        <div>
            <Tag>
                {item.key}
            </Tag>
        </div>
    );
}

export default DragSource(
    DRAGGABLE_TYPE.variable,
    itemSource,
    COLLECT_DRAG,
)(EventVarDrag);