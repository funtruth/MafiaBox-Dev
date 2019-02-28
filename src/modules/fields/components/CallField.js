import React from 'react'

export default function CallField(props) {
    const { path, value } = props

    let handleChange = e => props.updatePage(path, e.target.value)

    return (
        <input
            className="field-call-input"
            value={value || ''}
            onChange={handleChange}
            placeholder="untitled"
            type="text"
        />
    )
}