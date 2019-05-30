import React, { useState, useEffect } from 'react'
import _ from 'lodash'

import { ITEM_TYPE } from '../types'

export default function StringInput(props) {
    const { stringRepo, activeKey } = props

    const [text, setText] = useState('')
    const [disabled, setDisabled] = useState(false)
    useEffect(() => {
        if (activeKey === '') {
            setText('')
            setDisabled(false)
        } else {
            const selectedItem = stringRepo[activeKey] || {}
            const { string, type } = selectedItem

            switch(type) {
                case ITEM_TYPE.string:
                    setText(string)
                    setDisabled(false)
                    break
                case ITEM_TYPE.variable:
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