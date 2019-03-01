import React, { useState } from 'react'
import _ from 'lodash'
import Fuse from 'fuse.js'
import * as helpers from '../../../common/helpers'

import { fuseType } from '../../../dropdown/types'

import EventEditor from './EventEditor';

export default function EventDashboard(props) {
    const { workspace, setWorkspace } = props

    let [searchText, setSearchText] = useState('')
    let [results, setResults] = useState([])
    let fuse = new Fuse(_.toArray(props.attach), fuseType.stringDashboard)
    
    let handleType = (e) => {
        setSearchText(e.target.value)
        setResults(fuse.search(e.target.value))
    }

    let handleItemClick = (item) => {
        document.getElementById('text-editor-title-input').focus()
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

        document.getElementById('text-editor-title-input').focus()
        setWorkspace({
            ...workspace,
            selectedKey: newKey,
            value: {
                ...workspace.value,
                [newKey]: newItem,
            }
        })
    }

    const current = searchText ? results : _.toArray(workspace.value)

    return (
        <div className="dashboard" cancel-appclick="true">
            <div className="dashboard-results border-right">
                <input
                    className="tag-input"
                    value={searchText}
                    onChange={handleType}
                    placeholder="Search for event"
                    type='text'
                    autoFocus
                    style={{
                        margin: '12px 10px 0px 10px',
                    }}
                />
                <div className="-sep"/>
                {current.length ?
                    current.map((item, index) => {
                        return (
                            <div
                                key={index}
                                highlight="true"
                                className="dashboard-item"
                                onClick={handleItemClick}
                            >
                                <div className="dashboard-item-title">
                                    {item.title}
                                </div>
                                {item.string}
                            </div>
                        )
                    })
                    :<div className="empty-text">
                        No events found
                    </div>
                }
                <div className="-sep"/>
                <div
                    className="dashboard-item dashboard-new-item"
                    onClick={handleCreate}
                >
                    <div className="dashboard-item-title">
                        Create Event
                    </div>
                    Make a new event from scratch
                </div>
            </div>
            <EventEditor {...props}/>
        </div>
    )
}