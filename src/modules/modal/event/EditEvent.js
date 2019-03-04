import React, { useState } from 'react'
import './EditEvent.css'

import { updateViewType } from '../../logic/types'
import { WS_EDIT_EVENT, WS_EDIT_EVENT_VALUE } from '../workspaces'
import { StatefulSourceId } from '../../dropdown/types'

import ModalOptions from '../components/ModalOptions'
import ModalCheckSave from '../components/ModalCheckSave';
import DropdownView from '../../dropdown/DropdownView'

import EventBarDrop from './components/EventBarDrop';
import EventPlayground from './components/EventPlayground';
import EventDetailer from './components/EventDetailer';

export default function EditEvent(props) {
    let [workspace, setWorkspace] = useState(Object.assign({}, WS_EDIT_EVENT, props.attach))
    let [text, setText] = useState('')
    let [error, setError] = useState('')
    
    const { eventIndex, stringIndex, eventArr } = workspace
    const selectedEvent = eventArr[eventIndex] || WS_EDIT_EVENT_VALUE

    const mainProps = {
        workspace, setWorkspace,
        text, setText,
        setError,
        eventIndex, stringIndex,
        selectedEvent,
    }

    let handleSave = () => {
        props.updatePage(
            props.path,
            {
                eventArr: workspace.eventArr,
                updateViewType: updateViewType.events,
            },
            props.subpath,
        )
        props.popModalBy(1)
    }
    
    return (
        <ModalCheckSave
            {...props}
            past={props.attach.eventArr}
            current={eventArr}
            handleSave={handleSave}
        >
            <div className="event-modal" cancel-appclick="true">
                <div className="row" style={{ height: '100%' }}>
                    <EventBarDrop {...mainProps}/>
                    <EventPlayground {...mainProps}/>
                    <EventDetailer {...mainProps} vars={props.attachVar}/>
                </div>
                <DropdownView
                    sourceId={StatefulSourceId.editEvent}
                    state={workspace}
                    updateState={setWorkspace}
                />
                <ModalOptions
                    error={error}
                    onSave={handleSave}
                    onClose={props.close}
                />
            </div>
        </ModalCheckSave>
    )
}