import React from 'react'
import _ from 'lodash'
import * as helpers from '../../../common/helpers'

import EventEditor from './EventEditor';

export default function EventDashboard(props) {
    const { workspace, setWorkspace } = props
    const arrayedItems = _.toArray(workspace.value)

    let handleItemClick = (item) => {
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

    return (
        <div className="dashboard" cancel-appclick="true">
            <div className="dashboard-results border-right -y-p">
                <div className="dashboard-section-title">Events</div>
                    {arrayedItems.map(item => (
                        <div
                            key={item.key}
                            highlight="true"
                            className="dashboard-item"
                            onClick={handleItemClick}
                        >
                            {item.string}
                        </div>
                    ))}
                    {!arrayedItems.length && <div className="empty-text">No events found</div>}
                <div className="-sep"/>
                <div className="dashboard-new-item" onClick={handleCreate}>
                    <i className="mdi mdi-calendar-plus" style={{ marginRight: 4 }}></i>
                    <div className="dashboard-item-title">Create Event</div>
                </div>
            </div>
            <EventEditor {...props}/>
        </div>
    )
}