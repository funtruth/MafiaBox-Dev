import React from 'react';
import './TextArea.css'

export default function TextArea(props) {
    const {
        className           = '',
        style,
        value,
        handleChange,
        handleBlur,
        handleFocus,
        handleKeyPress,
        type,
        placeholder,
    } = props

    const classes = [
        '--textarea',
        className,
    ].join(" ")

    const bodyStyle = {
        ...style,
    }

    return (
        <textarea
            className={classes}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            type={type}
            style={bodyStyle}
        />
    )
}