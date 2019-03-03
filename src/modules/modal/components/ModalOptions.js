import React from 'react'

export default function ModalOptions(props) {
    return (
        <div className="row modal-options">
            <div
                className="error-text"
                style={{
                    marginLeft: 8,
                }}
            >
                {props.error || ''}
            </div>
            <div
                className="modal-button"
                onClick={props.onSave}
                style={{
                    marginLeft: 'auto',
                }}
            >
                Save
            </div>
            <div
                className="underline-button"
                onClick={props.onClose}
            >
                Cancel
            </div>
        </div>
    )
}