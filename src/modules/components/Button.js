import React from 'react';

import Text from './Text'

const getColor = (theme) => {
    switch(theme) {
        default:            return '#fff'
    }
}

const getBackground = (theme) => {
    switch(theme) {
        case 'lightgrey':   return '#424650'
        case 'grey':        return '#424650'
        case 'darkgrey':    return '#424650'
        case 'red':         return '#B34B50'
        case 'clear':       return 'transparent'
        default:            return '#282b30'
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

    const color             = getColor(theme)
    const backgroundColor   = getBackground(theme)

    const classes = [
        'accessibilityOutline',
        '--button',
        className,
    ].join(" ")

    const buttonStyle = {
        color,
        backgroundColor,
        ...style,
    }
    
    return (
        <button
            className={classes}
            style={buttonStyle}
            onClick={event => onClick && onClick({ event })}
        >
            <Text size={size} theme={theme} bold>
                {children}
            </Text>
        </button>
    )
}