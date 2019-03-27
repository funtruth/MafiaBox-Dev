import React from 'react';
import './Icon.css'

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

export default function Icon(props) {
    const {
        className = "",
        size = 'medium',
        color = '#fff',
        style,
        hover,
        onClick,
    } = props

    const textStyle = {
        fontSize: getFontSize(size),
        ...style,
    }

    const classes = [
        '--icon',
        '--icon-' + color,
        hover ? '--icon-hover' : '',
        className,
    ].join(" ")
    
    return (
        <i
            className={classes}
            style={textStyle}
            onClick={event => onClick && onClick({ event })}
        />
    )
}