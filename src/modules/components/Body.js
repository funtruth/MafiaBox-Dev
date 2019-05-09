import React from 'react';
import { palette, padding, alignX, justifyY } from './Standards'

const getPadding = (size) => {
    switch(size) {
        case 'xs':          return '8px 12px'
        case 's':           return '10px 14px'
        case 'l':           return '12px 16px'
        case 'xl':          return '12px 16px'
        case 'xxl':         return '12px 16px'
        default:            return '0px 0px'
    }
}

export default function Body(props) {
    const {
        children,
        size                = '',
        sizes               = '',
        y                   = '',
        x                   = '',
        className           = '',
        style,
        color,
        bg,
    } = props

    const classes = [
        '--body',
        className,
    ].join(" ")

    const bodyStyle = {
        justifyContent: justifyY(y),
        alignItems: alignX(x),
        padding: size ? getPadding(size) : sizes && padding(sizes),
        color: palette(color),
        backgroundColor: bg && palette(bg),
        ...style,
    }

    return (
        <div
            className={classes}
            style={bodyStyle}
        >
            {children}
        </div>
    )
}