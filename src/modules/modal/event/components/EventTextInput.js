import React, { useState } from 'react'
import * as helpers from '../../../common/helpers'

export default function EventTextInput({workspace, setWorkspace}) {
    let [text, setText] = useState('')

    let handleSubmit = () => {
        const { value, selectedKey } = workspace
        const oldInfo = value[selectedKey].string
        const newString = {
            string: text,
            color: '#fff',
        }

        setText('')
        setWorkspace(
            helpers.updateByPath(
                ['value', selectedKey],
                {
                    string: [...oldInfo, newString],
                },
                workspace,
            )
        )
    }

    let handleChange = (e) => setText(e.target.value)
    let handleKey = (e) => {
        switch(e.nativeEvent.key) {
            case 'Enter':
                e.preventDefault();
                handleSubmit();
                break
            default:
        }
    }

    return (
        <textarea
            id="event-editor-textarea"
            className="dashboard-input"
            value={text}
            onChange={handleChange}
            onKeyDown={handleKey}
            placeholder={workspace.selectedKey?"Type a string and press enter ...":"Select or create an event ..."}
            type="text"
        />
    )
}