import React from 'react';
import './Tag.css'

import Text from './Text'

export default function Tag(props) {
    const {
        children,
        onClick,
        className           = '',
        size                = 's',
        theme               = 'black',
        style,
    } = props

    const classes = [
        '--tag',
        `--tag-${theme}`,
        className,
    ].join(" ")

    const buttonStyle = {
        ...style,
    }
    
    return (
        <div
            className={classes}
            style={buttonStyle}
            onClick={event => onClick && onClick({ event })}
        >
            <Text size={size}>
                {children}
            </Text>
        </div>
    )
}