import React from 'react';

const getAlign = (align) => {
    switch(align) {
        case 'c':           return 'center'
        case 'r':           return 'flex-end'
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
        default:            return '12px 16px'
    }
}

export default function Footer(props) {
    const {
        children,
        size                = '',
        align               = '',
        className           = '',
        style,
    } = props

    const alignItems        = getAlign(align)
    const padding           = getPadding(size)

    const classes = [
        '--body',
        className,
    ].join(" ")

    const bodyStyle = {
        alignItems,
        padding,
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