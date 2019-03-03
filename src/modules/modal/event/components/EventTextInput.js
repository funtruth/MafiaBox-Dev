import React, { useState } from 'react'

export default function EventTextInput(props) {
    let [text, setText] = useState('')

    let handleChange = (e) => setText(e.target.value)
    let handleKey = (e) => {
        switch(e.nativeEvent.key) {
            case 'Enter':
            
                break
            default:
        }
    }

    return (
        <textarea
            className="dashboard-input"
            value={text}
            onChange={handleChange}
            onKeyDown={handleKey}
            placeholder="Type a string and press enter ..."
            type="text"
        />
    )
}