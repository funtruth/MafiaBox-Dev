import React from 'react';

export default function Input(props) {
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
        '--input',
        className,
    ].join(" ")

    const bodyStyle = {
        ...style,
    }

    return (
        <input
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