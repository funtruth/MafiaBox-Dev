import React from 'react'
import { DragSource } from 'react-dnd'

import { ItemTypes } from './EventConstants'
import { COLLECT_DRAG } from '../EventDND';

const itemSource = {
    beginDrag(props) {
        return {}
    }
}
  
function EventVarDrag(props) {
    const { item, connectDragSource } = props
    
    return connectDragSource(
        <div
            className="event-var"
        >
            {item.key}
        </div>
    );
}

export default DragSource(
    ItemTypes.EVENT_VAR,
    itemSource,
    COLLECT_DRAG,
)(EventVarDrag);