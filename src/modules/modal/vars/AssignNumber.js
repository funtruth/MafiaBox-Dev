import React from 'react'
import _ from 'lodash'
import './AssignNumModal.css'

import Modal from '../components/Modal'
import ModalOptions from '../components/ModalOptions'
import NumberView from '../../numbers/NumberView';

export default function AssignNumber(props) {
    const { close } = props
    
    return (
        <Modal
            style={{
                minWidth: 600,
                maxWidth: '90vw',
            }}
        >
            <NumberView {...props}/>
            <ModalOptions onClose={close}/>
        </Modal>
    )
}