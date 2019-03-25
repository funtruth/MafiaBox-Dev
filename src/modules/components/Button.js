import React from 'react';
import './Button.css';

export default function Button(props) {
    const {
        children,
        onClick,
        className = "",
        size = 'medium',
        theme = 'black',
        styles,
    } = props

    const classNames = [
        className,
        '--button',
        '--button-' + size,
        '--button-' + theme,
    ].join(" ")
    
    return (
        <button
            className={classNames}
            style={styles}
            onClick={event => onClick && onClick({ event })}
        >
            {children}
        </button>
    )
}