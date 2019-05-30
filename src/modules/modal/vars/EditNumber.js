import React from 'react'

import Modal from '../components/Modal'
import ModalOptions from '../components/ModalOptions';
import NumberView from '../../numbers/NumberView';

export default function EditNumber(props) {
    const { path, close, scopedVars } = props
    
    return (
        <Modal
            style={{
                minWidth: 600,
                maxWidth: '90vw',
            }}
        >
            <NumberView
                path={path}
                scopedVars={scopedVars}
            />
            <ModalOptions onClose={close}/>
        </Modal>
    )
}