import React from 'react';
import { Text } from './Common';

const getAlign = (align) => {
    switch(align) {
        case 'c':   return 'center'
        case 'r':   return 'flex-end'
        default:    return 'flex-start'
    }
}

export default function Footer(props) {
    const {
        text        = '',
        children,
        align       = '',
        className   = '',
        onClose,
        style,
    } = props

    const justifyContent = getAlign(align)

    const classes = [
        '--header',
        className,
    ].join(" ")

    const headerStyle = {
        justifyContent,
        ...style,
    }

    return (
        <div
            className={classes}
            style={headerStyle}
        >
            <Text size="xxl" bold color="lightgrey">{text}</Text>
            {children}
            {onClose && <i className="mdi mdi-close"></i>}
        </div>
    )
}