import React, { useState, useEffect } from 'react'

import { parseType } from '../../common/types';

export default function StringInput(props) {
    const { stringRepo, activeKey } = props

    const [text, setText] = useState('')
    const [disabled, setDisabled] = useState(false)
    useEffect(() => {
        if (activeKey === '') {
            setText('')
            setDisabled(false)
        } else {
            const { value, parseBy } = stringRepo[activeKey] || {}

            switch(parseBy) {
                case parseType.constant:
                    setText(value)
                    setDisabled(false)
                    break
                case parseType.variable:
                    setText('Variable selected.')
                    setDisabled(true)
                    break
                default:
            }
        }
    }, [activeKey])

    let handleSubmit = () => {
        if (!text) return;

        props.addString(text)
        setText('');
    }

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
            readOnly={disabled}
            onChange={e => setText(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type a string and press enter ..."
            type="text"
        />
    )
}