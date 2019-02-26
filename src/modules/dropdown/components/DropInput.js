import React, { useState } from 'react'

export default function DropInput(props){
    let [value, setValue] = useState('')

    let handleType = e => setValue(e.target.value)

    let handleSubmit = () => {
        props.updatePage(value)
    }

    let handleKeyPress = e => {
        switch(e.nativeEvent.key) {
            case 'Enter':
                handleSubmit()
                break
            default:
        }
    }

    const { type, inputText } = props

    return (
        <>
            <input
                className="tag-input"
                value={value}
                onChange={handleType}
                onKeyDown={handleKeyPress}
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