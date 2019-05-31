import React from 'react';
import './LogicButton.css'

import { palette } from './Standards';

const getFont = (size) => {
    switch(size) {
        default:            return '500 14px Segoe UI'
    }
}

const getPadding = (size) => {
    switch(size) {
        default:            return '4px 12px'
    }
}

export default function LogicButton(props) {
    const {
        children,
        onClick,
        className           = '',
        size                = 'm',
        theme               = 'black',
        style,
        highlight,
        color,
    } = props

    const classes = [
        '--logic-button',
        'text-ellipsis',
        'row',
        `--logic-button-${theme}`,
        onClick ? '--logic-button-onclick' : '',
        className,
    ].join(" ")

    const buttonStyle = {
        padding: getPadding(size),
        font: getFont(size),
        color: palette(color || 'whitish'),
        borderLeft: highlight ? `4px solid ${palette(highlight)}` : '1px solid #444',
        ...style,
    }
    
    return (
        <div
            className={classes}
            style={buttonStyle}
            onClick={event => onClick && onClick(event)}
        >
            {children}
        </div>
    )
}