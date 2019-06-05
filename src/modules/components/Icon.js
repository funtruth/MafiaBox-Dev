import React from 'react';
import { palette } from './Standards';

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
        icon = "",
        className = "",
        title,
        size = 'medium',
        color = 'whitish',
        style,
        onClick,
    } = props

    const textStyle = {
        fontSize: getFontSize(size),
        color: palette(color),
        ...style,
    }

    const classes = [
        className,
        "mdi mdi-" + icon,
        onClick ? '--onclick' : '',
    ].join(" ")
    
    return (
        <i
            className={classes}
            style={textStyle}
            title={title}
            onClick={event => onClick && onClick({ event })}
        />
    )
}