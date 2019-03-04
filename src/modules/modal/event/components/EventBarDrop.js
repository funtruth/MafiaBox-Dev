import React from 'react'
import _ from 'lodash'
import { DropTarget } from 'react-dnd'

import { WS_EDIT_EVENT_VALUE } from '../../workspaces';

import EventBarItemDrag from './EventBarItemDrag'

const itemTarget = {
    drop(props) {
        return {}
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true }),
    }
}

function EventBarDrop(props) {
    const { connectDropTarget, workspace, setWorkspace, setText, eventIndex, setError } = props
    const { eventArr } = workspace

    let handleSelect = (index) => {
        document.getElementById('event-editor-textarea').focus()
        setWorkspace({
            ...workspace,
            eventIndex: index,
            stringIndex: '',
        })
        setText('')
        setError('')
    }

    let handleCreate = () => {
        document.getElementById('event-editor-textarea').focus()
        setWorkspace({
            ...workspace,
            eventIndex: eventArr.length,
            stringIndex: '',
            eventArr: _.cloneDeep(eventArr).concat(WS_EDIT_EVENT_VALUE)
        })
        setText('')
        setError('')
    }

    let renderItem = (item, index) => {
        return (
            <EventBarItemDrag
                key={index}
                eventIndex={eventIndex}
                item={item}
                index={index}
                onClick={handleSelect}
            />
        )
    }

    return connectDropTarget(
        <div className="event-bar">
            <div className="dashboard-section-title">Events</div>
            {eventArr.map(renderItem)}
            <div className="dashboard-item" onClick={handleCreate}>
                <i className="mdi mdi-plus"></i>
            </div>
        </div>
    );
}

export default DropTarget(
    [],
    itemTarget,
    collect
)(EventBarDrop);