import React from 'react'

import ModalOptions from '../components/ModalOptions'
import Modal from '../components/Modal'
import StringView from '../../strings/StringView';
import EditToastHeader from './components/EditToastHeader';

export default function EditToast(props) {
    const { path, close, scopedVars } = props

    return (
        <Modal
            style={{
                minWidth: 600,
                width: '75vw',
                height: '60vh',
            }}
        >
            <EditToastHeader {...props}/>
            <StringView
                path={[...path, 'string']}
                scopedVars={scopedVars}
            />
            <ModalOptions onClose={close}/>
        </Modal>
    )
}