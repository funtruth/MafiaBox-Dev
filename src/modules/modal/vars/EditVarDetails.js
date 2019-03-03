import React, { useState } from 'react'

import ModalOptions from '../components/ModalOptions'
import ToastEditor from '../../strings/components/ToastEditor';

export default function EditVarDetails(props) {
    let [error, setError] = useState('')

    let handleSave = () => {
        const { isTrigger, attach } = props
        const { string } = attach

        if (string.length === 0) {
            return setError('Toast message cannot be empty.')
        }

        if (isTrigger) {
            props.popModalBy(1)
            props.onAttach()
        } else {
            props.onSave()
            props.popModalBy(1)
        }
    }
    
    return (
        <div
            cancel-appclick="true"
            style={{
                display: 'flex',
                flexDirection: 'column',
                minWidth: 600,
                width: '45vw',
            }}
        >
            <ToastEditor {...props}/>
            <ModalOptions
                error={error}
                onSave={handleSave}
                onClose={props.onClose}
            />
        </div>
    )
}