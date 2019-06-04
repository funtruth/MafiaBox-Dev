import React from 'react';

import { palette } from './Standards';
import Row from './Row';

const getFont = (size) => {
    switch(size) {
        default:            return '500 14px Segoe UI'
    }
}

const getPadding = (size) => {
    switch(size) {
        default:            return '4px 8px'
    }
}

export default function LogicButton(props) {
    const {
        children,
        onClick,
        disabled,
        className   = '',
        size        = 'm',
        bg          = 'charcoal',
        style,
        highlight,
        color       = 'whitish',
    } = props

    const classes = [
        'text-ellipsis',
        onClick && !disabled ? '--onclick' : '--disabled',
        className,
    ].join(" ")

    const buttonStyle = {
        padding: getPadding(size),
        font: getFont(size),
        color: palette(color),
        backgroundColor: palette(bg),
        borderLeft: highlight ? `4px solid ${palette(highlight || 'darkgrey')}` : '1px solid #444',
        minHeight: '1.4em',
        maxWidth: 200,
        margin: 2,
        borderRadius: 2,
        ...style,
    }
    
    return (
        <Row
            className={classes}
            style={buttonStyle}
            wrap="nowrap"
            y="c"
            onClick={event => !disabled && onClick && onClick(event)}
        >
            {children}
        </Row>
    )
}