import React from 'react'

export default function LogicUpdateDisplay(props) {
    const { data } = props
    const { display } = data

    if (!display) return null

    return (
        <div className="logic-display">
            {display}
        </div>
    )
}