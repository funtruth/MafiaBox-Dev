import React from 'react';
import { palette, padding } from './Standards'

const getAlign = (align) => {
    switch(align) {
        case 'c':           return 'center'
        case 'r':           return 'flex-end'
        case 's':           return 'stretch'
        default:            return 'flex-start'
    }
}

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
        align               = '',
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
        alignItems: getAlign(align),
        padding: size ? getPadding(size) : sizes && padding(sizes),
        color: palette(color),
        bg: bg && palette(bg),
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