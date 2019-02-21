import React from 'react'

export default function InactiveOp(props) {
    return (
        <div className="basic-op">
            <div className="basic-op-bubble">x</div>
            <div className="basic-op-op">{props.char}</div>
            <div className="basic-op-bubble">y</div>
        </div>
    )
}