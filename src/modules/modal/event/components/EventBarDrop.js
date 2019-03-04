import React from 'react'
import _ from 'lodash'
import * as helpers from '../../../common/helpers'
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
    const { connectDropTarget, workspace, setWorkspace, text, setText, selectedKey, setError } = props

    let handleSelect = (item) => {
        document.getElementById('event-editor-textarea').focus()
        setError('')
        setWorkspace({
            ...workspace,
            selectedKey: item.key,
        })
    }

    let handleCreate = () => {
        const newKey = helpers.genUID('string', workspace.value)
        const newItem = {
            ...WS_EDIT_EVENT_VALUE,
            key: newKey,
            lastEdit: Date.now()
        }

        document.getElementById('event-editor-textarea').focus()
        setError('')
        setWorkspace({
            ...workspace,
            selectedKey: newKey,
            value: {
                ...workspace.value,
                [newKey]: newItem,
            }
        })
    }

    let renderItem = (item) => {
        return (
            <EventBarItemDrag
                key={item.key}
                selectedKey={selectedKey}
                item={item}
                onClick={handleSelect}
            />
        )
    }

    const data = _(workspace.value)
        .filter(i => i.key)
        .sortBy(i => i.index)
        .value()

    return connectDropTarget(
        <div className="event-bar">
            <div className="dashboard-section-title">Events</div>
            {data.map(renderItem)}
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