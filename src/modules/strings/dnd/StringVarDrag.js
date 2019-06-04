import React from 'react'
import { DragSource } from 'react-dnd'

import { parseType } from '../../logic/types';

import { COLLECT_DRAG } from '../../common/arrows';

import { Tag } from '../../components/Common';

const itemSource = {
    beginDrag(props) {
        return props.item
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
    parseType.variable,
    itemSource,
    COLLECT_DRAG,
)(EventVarDrag);