import React from 'react'
import { DragSource } from 'react-dnd'

import { ItemTypes } from './EventConstants'

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
  
function EventBarItemDrag(props) {
    const { workspace, setWorkspace, setText, setError, item, index, connectDragSource } = props
    
    let char = '*'
    if (item.stringArr[0]) {
        char = item.stringArr[0].string && item.stringArr[0].string.charAt(0)
    }

    let handleSelect = () => {
        document.getElementById('event-editor-textarea').focus()
        setWorkspace({
            ...workspace,
            eventIndex: index,
            stringIndex: '',
        })
        setText('')
        setError('')
    }

    return connectDragSource(
        <div
            className="dashboard-item"
            onClick={handleSelect}
        >
            {char}
        </div>
    );
}

export default DragSource(
    ItemTypes.EVENT_STRING,
    itemSource,
    collect
)(EventBarItemDrag);