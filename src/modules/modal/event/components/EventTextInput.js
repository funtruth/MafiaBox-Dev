import React, { useState } from 'react'
import * as helpers from '../../../common/helpers'

export default function EventTextInput(props) {
    let [text, setText] = useState('')

    const { workspace, setWorkspace, selectedItem, setError } = props
    const { selectedKey } = workspace

    let handleSubmit = () => {
        if (!text) return;
        if (!selectedKey) {
            setError('You must select an event first.')
            return;
        }

        const oldInfo = selectedItem.string
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
            handleSubmit();
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