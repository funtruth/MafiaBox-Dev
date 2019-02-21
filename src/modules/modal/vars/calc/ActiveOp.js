import React from 'react'

import { opBubbleType } from './ops';
import { dropdownType } from '../../../dropdown/types'

export default function ActiveOp(props) {
    let { assign } = props

    if (!assign) return (
        <div
            className="basic-op-bubble app-onclick"
            menu-type={dropdownType.pickBasicOp}
        >
            ...
        </div>
    )
    let { type } = assign
    switch(type) {
        case opBubbleType.basicOp.key:
            return (
                <div
                    className="basic-op"
                >
                    <ActiveOp assign={assign.left}/>
                    <div
                        className="basic-op-op"
                    >
                        +
                    </div>
                    <ActiveOp assign={assign.right}/>
                </div>
            )
        case opBubbleType.value.key:
            return (
                <div
                    className="basic-op-bubble app-onclick"
                    menu-type={dropdownType.pickBasicOp}
                >
                    ...
                </div>
            )
        default: 
            return null
    }
}