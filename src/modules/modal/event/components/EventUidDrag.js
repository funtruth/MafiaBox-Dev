import React from 'react'
import { DragSource } from 'react-dnd'

import { ItemTypes } from './EventConstants'
import { COLLECT_DRAG } from '../../ModalDND';

const itemSource = {
    beginDrag(props) {
        return {
            item: props.item,
        }
    }
}
  
function EventUidDrag(props) {
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
    ItemTypes.EVENT_UID,
    itemSource,
    COLLECT_DRAG,
)(EventUidDrag);