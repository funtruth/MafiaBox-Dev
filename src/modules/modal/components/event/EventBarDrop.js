import React from 'react'
import _ from 'lodash'
import * as helpers from '../../../common/helpers'
import { DropTarget } from 'react-dnd'

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
    const { connectDropTarget, workspace, setWorkspace } = props
    
    const data = _(workspace.value)
        .filter(i => i.string)
        .sortBy(i => i.index)
        .value()

    let handleSelect = (item) => {
        document.getElementById('text-editor-input').focus()
        setWorkspace({
            ...workspace,
            selectedKey: item.key,
        })
    }

    let handleCreate = () => {
        const newKey = helpers.genUID('string', workspace.value)
        const newItem = {
            key: newKey,
            lastEdit: Date.now()
        }

        document.getElementById('text-editor-input').focus()
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
                item={item}
                onClick={handleSelect}
            />
        )
    }

    return connectDropTarget(
        <div className="dashboard-results border-right -y-p">
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