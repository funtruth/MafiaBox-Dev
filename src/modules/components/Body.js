import React from 'react';

const getAlign = (align) => {
    switch(align) {
        case 'c':   return 'center'
        case 'r':   return 'flex-end'
        default:    return 'flex-start'
    }
}

export default function Footer(props) {
    const {
        children,
        align       = '',
        className   = '',
        style,
    } = props

    const alignItems = getAlign(align)

    const classes = [
        '--body',
        className,
    ].join(" ")

    const bodyStyle = {
        alignItems,
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