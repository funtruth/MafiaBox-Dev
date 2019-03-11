import React from 'react'

export default function Modal(props) {
    return (
        <div className="modal modal-appclick">
            <div className="modal-child" style={props.style}>
                {props.children}
            </div>
        </div>
    )
}