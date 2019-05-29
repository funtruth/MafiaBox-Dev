import React from 'react'

import ModalOptions from '../components/ModalOptions'
import Modal from '../components/Modal'
import StringView from '../../strings/StringView';

export default function EditToast(props) {
    const { path, close } = props

    return (
        <Modal
            style={{
                minWidth: 600,
                width: '75vw',
                height: '60vh',
            }}
        >
            <StringView path={path}/>
            <ModalOptions onClose={close}/>
        </Modal>
    )
}