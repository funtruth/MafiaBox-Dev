import React from 'react'
import './modals.css'
import { useSelector } from 'react-redux'

import ModalConnect from './ModalConnect';

export default function ModalView() {
    const modalKeys = useSelector(state => state.modal.modalKeys)

    return (
        modalKeys.map((item, index) => (
            <div key={item.key} className="modal modal-appclick">
                <div className="modal-child">
                    <ModalConnect
                        item={item}
                        index={index}
                    />
                </div>
            </div>
        ))
    )
}