import React, { useState } from 'react'
import _ from 'lodash'

import { modalType } from '../types'

export default function ModalCheckSave(props) {
    const { attach, children } = props

    let [savedValue] = useState(_.cloneDeep(attach))

    let handleClick = e => {
        //TODO this is broken for un-original clicks. See AppWrapper 64
        //onClick triggers when click starts in modal but ends outside the modal
        if (_.isEqual(attach, savedValue)) {
            props.popModalBy(1)
        } else {
            props.showModal(modalType.saveChanges, {
                onSave: props.handleSave,
                onClose: props.showModal,
            })
        }
    }

    const handlePropagate = e => e.stopPropagation();

    if (!attach) console.warn('ModalCheckSave is being used without an attach value.')
        
    return (
        <div id="parent-only" className="modal" onClick={handleClick}>
            <div className="modal-child" onClick={handlePropagate}>
                {children}
            </div>
        </div>
    )
}