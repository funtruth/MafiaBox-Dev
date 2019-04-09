import React, { useState } from 'react'
import './EditString.css'

import { updateType } from '../../logic/types'
import { WS_EDIT_EVENT_VALUE, WS_EDIT_EVENT } from './components/EventConstants'
import { updateSourceType } from '../../common/types';

import ModalOptions from '../components/ModalOptions'
import ModalCheckSave from '../components/ModalCheckSave';

import EventPlayground from './components/EventPlayground';
import EventDetailer from './components/EventDetailer';

export default function EditString(props) {
    let [text, setText] = useState('')
    let [error, setError] = useState('')

    const { attach, attachVar, path } = props
    const workspace = Object.assign({}, WS_EDIT_EVENT, attach)
    
    const { eventIndex, stringIndex, eventArr } = workspace
    const selectedEvent = (eventArr && eventArr[eventIndex]) || WS_EDIT_EVENT_VALUE

    const mainProps = {
        workspace,
        setWorkspace: props.setWorkspace,
        text, setText,
        setError,
        eventIndex, stringIndex,
        selectedEvent,
        path: ['attach'],
        subpath: [],
        updateSource: updateSourceType.topModal,
    }

    let handleSave = () => {
        props.updatePage(path, {
            eventArr: workspace.eventArr,
            updateType: updateType.events,
        })
        props.popModalBy(1)
    }
    
    return (
        <ModalCheckSave {...props} handleSave={handleSave}>
            <div className="event-modal" cancel-appclick="true">
                <div className="row" style={{ height: '100%' }}>
                    <EventPlayground {...mainProps}/>
                    <EventDetailer {...mainProps} vars={attachVar}/>
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