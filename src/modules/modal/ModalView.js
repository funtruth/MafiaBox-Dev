import React from 'react'
import './modals.css'
import { useSelector } from 'react-redux'

import ModalConnect from './ModalConnect';
import { Body } from '../components/Common'

export default function ModalView(props) {
    const modalKeys = useSelector(state => state.modal.modalKeys)

    return (
        modalKeys.map((item, index) => (
            <div key={item.key} className="modal modal-appclick">
                <Body className="modal-child" style={props.style}>
                    <ModalConnect
                        item={item}
                        index={index}
                    />
                </Body>
            </div>
        ))
    )
}