import React from 'react'
import './modals.css'
import { useSelector } from 'react-redux'

import ModalConnect from './ModalConnect';

export default function ModalView(props) {
    const modalKeys = useSelector(state => state.modal.modalKeys)

    return (
        modalKeys.map((item, index) => (
            <ModalConnect
                key={item.key}
                item={item}
                index={index}
            />
        ))
    )
}