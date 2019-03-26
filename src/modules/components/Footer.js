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

    const justifyContent = getAlign(align)

    const classes = [
        '--footer',
        className,
    ].join(" ")

    const footerStyle = {
        justifyContent,
        ...style,
    }

    return (
        <div
            className={classes}
            style={footerStyle}
        >
            {children}
        </div>
    )
}