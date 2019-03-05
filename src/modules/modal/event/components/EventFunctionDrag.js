import React from 'react'
import _ from 'lodash'
import { DragSource } from 'react-dnd'

import { ItemTypes, WS_EDIT_EVENT_STRING, PartTypes } from './EventConstants'
import { COLLECT_DRAG } from '../EventDND';

const itemSource = {
    beginDrag(props) {
        return {}
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
    COLLECT_DRAG,
)(EventFunctionDrag);