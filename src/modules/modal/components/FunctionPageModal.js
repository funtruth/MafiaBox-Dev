import React from 'react'
import FunctionPageView from '../../functions/FunctionPageView'
import Modal from './Modal'

export default function FunctionPageModal(props) {
    return (
        <Modal
            style={{
                minHeight: 400,
                minWidth: 600,
                height: '60vh',
                width: '65vw',
                overflow: 'scroll',
            }}
        >
            <FunctionPageView {...props}/>
        </Modal>
    )
}