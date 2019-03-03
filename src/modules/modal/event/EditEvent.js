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
    let [error, setError] = useState('')
    
    const { selectedKey, value } = workspace
    const selectedItem = value[selectedKey] || WS_EDIT_EVENT_VALUE
    
    const mainProps = {
        workspace,
        setWorkspace,
        selectedItem,
        setError,
    }

    let handleSave = () => {
        props.updatePage(
            props.path,
            {
                value: workspace.value,
                updateViewType: updateViewType.events,
            },
            props.subpath,
        )
        props.popModalBy(1)
    }
    
    return (
        <ModalCheckSave
            {...props}
            past={props.attach}
            current={workspace}
            handleSave={handleSave}
        >
            <div className="event-modal" cancel-appclick="true">
                <div className="row" style={{ height: '100%' }}>
                    <EventBarDrop {...mainProps}/>
                    <EventPlayground {...mainProps}/>
                    <EventDetailer {...mainProps}/>
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