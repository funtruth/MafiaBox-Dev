import React, { useState } from 'react'

import ModalOptions from '../components/ModalOptions'
import Body from '../../components/Body';

//TODO this is copy pasted, ignore
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
            key: 'toast', //TODO used in PickReturnType and LogicEngine
        })
        props.popModalBy(1)
    }
    
    return (
        <Body
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
        </Body>
    )
}