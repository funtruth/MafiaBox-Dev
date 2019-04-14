import React, { useState } from 'react'

export default function InputValue(props) {
    const { type, inputText, currentValue } = props
    const [text, setText] = useState(currentValue || "")

    const handleType = e => setText(e.target.value)
    const handleSubmit = () => props.onSubmit(text)
    const handleKeyDown = e => {
        switch(e.nativeEvent.key) {
            case 'Enter':
                handleSubmit()
                break
            default:
        }
    }

    return (
        <>
            <input
                className="tag-input"
                value={text}
                onChange={handleType}
                onKeyDown={handleKeyDown}
                placeholder={inputText || "Set value"}
                type={type || "number"}
                autoFocus
            />
            <div className="-sep"/>
            <div className="drop-down-menu-option" onClick={handleSubmit}>
                <i className="drop-down-menu-icon mdi mdi-checkbox-marked"></i>
                save
            </div>
        </>
    )
}