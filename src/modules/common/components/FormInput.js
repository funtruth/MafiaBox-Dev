import React from 'react'
import './FormInput.css'

export default function FormInput(props) {
    const {
        title,
        error,
        value,
        setValue,
    } = props

    const inputStyle = {
        border: !!error && '2px solid #db4757',
    }

    return (
        <div className="form-input-view">
            <div className="form-input-header">
                <div className="form-input-title">{title}</div>
                <div className="form-input-error">{error}</div>
            </div>
            <input
                className="form-input"
                value={value} 
                type="text"
                onChange={setValue}
                style={inputStyle}
            />
        </div>
    )
}