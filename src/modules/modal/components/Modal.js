import React from 'react'

export default function Modal(props) {
    return (
        <div className="modal modal-appclick">
            <div className="modal-child">
                {props.children}
            </div>
        </div>
    )
}