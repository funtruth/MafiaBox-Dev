import React from 'react'
import _ from 'lodash'
import { DragSource } from 'react-dnd'

import { ItemTypes, WS_EDIT_EVENT_STRING, PartTypes } from './EventConstants'

const itemSource = {
    beginDrag(props) {
        return {}
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
}
  
function EventFunctionDrag(props) {
    const { workspace, setWorkspace, eventIndex, item, connectDragSource } = props

    let handleSelect = () => {
        let wsClone = _.cloneDeep(workspace)
        wsClone.eventArr[eventIndex].stringArr.push({
            ...WS_EDIT_EVENT_STRING,
            functionKey: item.key,
            partType: PartTypes.function,
        })
        setWorkspace(wsClone)
    }
    
    return connectDragSource(
        <div
            className="event-function"
            onClick={handleSelect}
        >
            {item.key}
        </div>
    );
}

export default DragSource(
    ItemTypes.EVENT_FUNCTION,
    itemSource,
    collect
)(EventFunctionDrag);