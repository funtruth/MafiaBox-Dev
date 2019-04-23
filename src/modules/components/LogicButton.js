import React from 'react';
import './LogicButton.css'

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

const getHighlight = (highlight) => {
    switch(highlight) {
        case 'whitish':     return '#ddd'
        case 'blue':        return '#18449b'
        case 'red':         return '#db4757'
        case 'pink':        return '#a566b0'
        default:            return highlight
    }
}

const getColor = (color) => {
    switch(color) {
        case 'darkgrey':    return '#666'
        case 'grey':        return '#999'
        case 'lightgrey':   return '#bbb'
        case 'whitish':     return '#ddd'
        case 'white':       return '#fff'
        default:            return '#ddd'
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
        color: getColor(color),
        borderLeft: highlight ? `4px solid ${getHighlight(highlight)}` : '1px solid #444',
        ...style,
    }
    
    return (
        <div
            className={classes}
            style={buttonStyle}
            onClick={event => onClick && onClick({ event })}
        >
            {children}
        </div>
    )
}