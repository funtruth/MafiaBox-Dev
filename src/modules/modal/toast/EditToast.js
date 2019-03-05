import React, { useState } from 'react'
import _ from 'lodash'

import { StatefulSourceId } from '../../dropdown/types'

import ModalOptions from '../components/ModalOptions'
import ModalCheckSave from '../components/ModalCheckSave';
import DropdownView from '../../dropdown/DropdownView';
import ToastWorkspace from './components/ToastWorkspace';

export default function EditToast(props) {
    const { path } = props
    
    let [workspace, setWorkspace] = useState(_.cloneDeep(props.attach))
    let [error, setError] = useState('')
    
    let handleSave = () => {
        const { string } = workspace

        if (string.length === 0) {
            return setError('Toast message cannot be empty.')
        }

        props.updatePage(
            path,
            {
                ...workspace,
                key: 'toast', //TODO used in PickReturnType and LogicReducer
            },
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
            <div
                cancel-appclick="true"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 600,
                    width: '45vw',
                }}
            >
                <ToastWorkspace
                    workspace={workspace}
                    setWorkspace={setWorkspace}
                />
                <ModalOptions
                    error={error}
                    onSave={handleSave}
                    onClose={props.onClose}
                />
            </div>
            <DropdownView
                sourceId={StatefulSourceId.editToast}
                state={workspace}
                updateState={setWorkspace}
            />
        </ModalCheckSave>
    )
}