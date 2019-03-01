import React from 'react'
import Modal from './Modal';

export default function SaveChanges(props) {
    let _onSave = () => {
        props.onSave()
    }

    let _onClose = () => {
        props.popModalBy(1)
    }

    let _onQuit = () => {
        props.popModalBy(2)
    }

    return (
        <Modal>
            <div style={{ padding: 16 }}>
                <div className="modal-title">
                    Save changes?
                </div>
                <div className="modal-subtitle">
                    your changes will be lost if you do not save.
                </div>
            </div>
            <div className="row modal-options">
                <div className="underline-button" onClick={_onSave}>
                    Save
                </div>
                <div className="underline-button" onClick={_onClose}>
                    Cancel
                </div>
                <div className="delete-button" onClick={_onQuit}>
                    Don't Save
                </div>
            </div>
        </Modal>
    )
}