import React from 'react';
import { palette } from './Standards';

const getAlign = (align) => {
    switch(align) {
        case 'c':   return 'center'
        case 'r':   return 'flex-end'
        case 'l':   return 'flex-start'
        default:    return 'stretch'
    }
}

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

const getMarginTop = (size) => {
    switch(size) {
        case 'xs':          return -1
        case 's':           return -1
        case 'l':           return -2
        case 'xl':          return -3
        case 'xxl':         return -4
        default:            return -2 //'m'
    }
}

export default function Text(props) {
    const {
        children,
        bold,
        underline,
        align = "",
        className = "",
        size = 'm',
        color = 'whitish',
        style,
    } = props

    const textStyle = {
        fontWeight: bold ? 700 : 500,
        fontSize: getFontSize(size),
        fontFamily: 'Segoe UI',
        letterSpacing: -0.4,
        alignSelf: getAlign(align),
        marginTop: getMarginTop(size),
        color: palette(color),
        ...style,
    }

    const classes = [
        underline ? '--text-underline' : '',
        className,
    ].join(" ")
    
    return (
        <div className={classes} style={textStyle}>
            {children}
        </div>
    )
}