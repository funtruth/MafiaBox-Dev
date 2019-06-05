import React from 'react';
import { palette, alignX, value } from './Standards';

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
        case 'l':           return -1
        case 'xl':          return -2
        case 'xxl':         return -2
        default:            return -1 //'m'
    }
}

export default function Text(props) {
    const {
        children,
        bold,
        underline,
        align       = "",
        className   = "",
        size        = 'm',
        after       = "z",
        before      = "z",
        color       = 'whitish',
        style,
    } = props

    const textStyle = {
        fontWeight: bold ? 700 : 500,
        fontSize: getFontSize(size),
        fontFamily: 'Segoe UI',
        letterSpacing: -0.4,
        alignSelf: alignX(align),
        marginTop: getMarginTop(size),
        marginLeft: value(before),
        marginRight: value(after),
        color: palette(color),
        ...style,
    }

    const classes = [
        underline ? '--text-underline' : '',
        'text-ellipsis',
        className,
    ].join(" ")
    
    return (
        <div className={classes} style={textStyle}>
            {children}
        </div>
    )
}