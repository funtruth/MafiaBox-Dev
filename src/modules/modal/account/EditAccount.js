import React, { useState } from 'react'

import ModalOptions from '../components/ModalOptions'
import ModalCheckSave from '../components/ModalCheckSave';

export default function EditAccount(props) {
    let [error, setError] = useState('')

    const { attach, path } = props

    const workspace = attach
    
    let handleSave = () => {
        const { string } = workspace

        if (string.length === 0) {
            return setError('Toast message cannot be empty.')
        }

        props.updatePage(path, {
            ...workspace,
            key: 'toast', //TODO used in PickReturnType and LogicReducer
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
                <ModalOptions
                    error={error}
                    onSave={handleSave}
                    onClose={props.onClose}
                />
            </div>
        </ModalCheckSave>
    )
}