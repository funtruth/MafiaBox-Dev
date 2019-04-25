import React from 'react';
import { palette } from './Colors'

const getJustify = (justify) => {
    switch(justify) {
        case 'c':           return 'center'
        case 'r':           return 'flex-end'
        default:            return 'flex-start'
    }
}

const getAlign = (align) => {
    switch(align) {
        case 'c':           return 'center'
        case 'e':           return 'flex-end'
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

export default function Row(props) {
    const {
        children,
        size                = '',
        y                   = '',
        x                   = '',
        className           = '',
        style,
        color,
        bg,
    } = props

    const classes = [
        '--row',
        className,
    ].join(" ")

    const bodyStyle = {
        justifyContent: getJustify(x),
        alignItems: getAlign(y),
        padding: getPadding(size),
        backgroundColor: bg && palette(bg),
        color: palette(color || 'whitish'),
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