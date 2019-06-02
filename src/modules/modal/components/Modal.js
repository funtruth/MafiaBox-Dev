import React from 'react'

import Body from '../../components/Body';

export default function Modal(props) {
    return (
        <div className="modal modal-appclick">
            <Body className="modal-child" style={props.style}>
                {props.children}
            </Body>
        </div>
    )
}