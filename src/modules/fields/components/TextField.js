import React from 'react'

export default function TextField(props) {
    const { path, value, inputType } = props

    let handleChange = e => {
        props.updatePage(path, e.target.value)
    }

    return (
        <textarea
            className="field-text-input"
            value={value || ''}
            onChange={handleChange}
            placeholder="Start typing ..."
            type={inputType}
        />
    )
}