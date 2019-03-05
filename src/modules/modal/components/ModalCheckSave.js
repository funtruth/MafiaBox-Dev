import React, { useState } from 'react'
import _ from 'lodash'

import { modalType } from '../types'

export default function ModalCheckSave(props) {
    const { attach, children } = props

    let [savedValue] = useState(_.cloneDeep(attach))

    let handleClick = e => {
        if (e.target.id === 'parent-only') {
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
    }
        
    return (
        <div id="parent-only" className="modal" onClick={handleClick}>
            <div style={{ pointerEvents: 'none' }}>
                <div className="modal-child" style={{ pointerEvents: 'all' }}>
                    {children}
                </div>
            </div>
        </div>
    )
}