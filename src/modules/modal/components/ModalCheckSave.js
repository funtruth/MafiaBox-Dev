import React from 'react'
import _ from 'lodash'

import { modalType } from '../types'

export default function ModalCheckSave(props) {
    let handleClick = e => {
        if (e.target.id === 'parent-only') {
            //TODO this is broken for un-original clicks. See AppWrapper 64
            //onClick triggers when click starts in modal but ends outside the modal
            if (_.isEqual(props.past, props.current)) {
                props.popModalBy(1)
            } else {
                props.showModal(modalType.saveChanges, {
                    onSave: props.handleSave,
                    onClose: props.showModal,
                })
            }
        }
    }

    const { children } = props
        
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