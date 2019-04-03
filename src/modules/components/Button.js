import React from 'react';
import './Button.css'

import Text from './Text'

const getPadding = (size) => {
    switch(size) {
        case 'xs':          return '8px 12px'
        case 's':           return '8px 12px'
        case 'l':           return '10px 14px'
        case 'xl':          return '12px 14px'
        case 'xxl':         return '12px 14px'
        default:            return '10px 12px'
    }
}

export default function Button(props) {
    const {
        children,
        onClick,
        className           = '',
        size                = 'm',
        theme               = 'black',
        style,
    } = props

    const padding           = getPadding(size)
    const underline         = theme === 'clear'

    const classes = [
        'accessibilityOutline',
        '--button',
        `--button-${theme}`,
        className,
    ].join(" ")

    const buttonStyle = {
        padding,
        ...style,
    }
    
    return (
        <button
            className={classes}
            style={buttonStyle}
            onClick={event => onClick && onClick({ event })}
        >
            <Text size={size} theme={theme} underline={underline}>
                {children}
            </Text>
        </button>
    )
}