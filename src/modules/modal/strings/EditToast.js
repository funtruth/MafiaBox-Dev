import React, { useState } from 'react'

import ModalOptions from '../components/ModalOptions'
import ModalCheckSave from '../components/ModalCheckSave';
import ToastWorkspace from './components/ToastWorkspace';

export default function EditToast(props) {
    let [error, setError] = useState('')

    const { attach, path } = props

    const workspace = attach

    const mainProps = {
        workspace,
        setWorkspace: props.setWorkspace,
    }
    
    let handleSave = () => {
        const { string } = workspace

        if (string.length === 0) {
            return setError('Toast message cannot be empty.')
        }

        props.updatePage(path, {
            ...workspace,
            key: 'toast', //TODO used in PickReturnType and LogicEngine
        })
        props.popModalBy(1)
    }
    
    return (
        <ModalCheckSave {...props} handleSave={handleSave}>
            <div
                cancel-appclick="true"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 600,
                    width: '45vw',
                }}
            >
                <ToastWorkspace {...mainProps}/>
                <ModalOptions
                    error={error}
                    onSave={handleSave}
                    onClose={props.onClose}
                />
            </div>
        </ModalCheckSave>
    )
}