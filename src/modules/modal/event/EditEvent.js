import React, { useState } from 'react'
import './EditEvent.css'

import { updateViewType } from '../../logic/types'
import { WS_EDIT_EVENT_VALUE } from './components/EventConstants'
import { updateSourceType } from '../../common/types';

import ModalOptions from '../components/ModalOptions'
import ModalCheckSave from '../components/ModalCheckSave';

import EventBarDrop from './components/EventBarDrop';
import EventPlayground from './components/EventPlayground';
import EventDetailer from './components/EventDetailer';

export default function EditEvent(props) {
    let [text, setText] = useState('')
    let [error, setError] = useState('')

    const workspace = props.attach
    
    const { eventIndex, stringIndex, eventArr } = workspace
    const selectedEvent = eventArr[eventIndex] || WS_EDIT_EVENT_VALUE

    const mainProps = {
        workspace,
        setWorkspace: props.setWorkspace,
        text, setText,
        setError,
        eventIndex, stringIndex,
        selectedEvent,
        updateSource: updateSourceType.topModal,
    }

    let handleSave = () => {
        props.updatePage({
            eventArr: workspace.eventArr,
            updateViewType: updateViewType.events,
        })
        props.popModalBy(1)
    }
    
    return (
        <ModalCheckSave {...props} handleSave={handleSave}>
            <div className="event-modal" cancel-appclick="true">
                <div className="row" style={{ height: '100%' }}>
                    <EventBarDrop {...mainProps}/>
                    <EventPlayground {...mainProps}/>
                    <EventDetailer {...mainProps} vars={props.attachVar}/>
                </div>
                <ModalOptions
                    error={error}
                    onSave={handleSave}
                    onClose={props.close}
                />
            </div>
        </ModalCheckSave>
    )
}