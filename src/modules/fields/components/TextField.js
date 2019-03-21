import React, { useState } from 'react'

export default function TextField(props) {
    const { path, inputType } = props
    
    const [value, setValue] = useState(props.value)

    const handleChange = e => {
        setValue(e.target.value)
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {    
            e.target.blur() 
        }
    }

    const handleTextBlur = () => {
        props.updatePage(path, value)
    }

    return (
        <textarea
            className="field-text-input"
            value={value}
            onChange={handleChange}
            onBlur={handleTextBlur}
            onKeyPress={handleKeyPress}
            placeholder="Start typing ..."
            type={inputType}
        />
    )
}