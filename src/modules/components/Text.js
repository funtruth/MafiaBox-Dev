import React from 'react';

const getFontSize = (size) => {
    switch(size) {
        case 'xs':          return 12
        case 's':           return 14
        case 'l':           return 18
        case 'xl':          return 21
        case 'xxl':         return 25
        default:            return 16 //'m'
    }
}

const getColor = (theme) => {
    switch(theme) {
        default:            return '#fff'
    }
}

export default function Text(props) {
    const {
        children,
        onClick,
        className = "",
        size = 'medium',
        theme = 'black',
        styles,
    } = props

    const fontSize          = getFontSize(size)
    const color             = getColor(theme)

    const buttonStyle = {
        cursor: 'pointer',
        boxSizing: 'border-box',
        padding: '8px 14px',
        font: `700 ${fontSize}px Segoe UI`,
        letterSpacing: -0.4,
        color,
        ...styles,
    }
    
    return (
        <button
            className={className}
            style={buttonStyle}
            onClick={event => onClick && onClick({ event })}
        >
            {children}
        </button>
    )
}