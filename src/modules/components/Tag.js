import React from 'react';
import './Tag.css'

import Text from './Text'

export default function Tag(props) {
    const {
        icon,
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
            onClick={event => onClick && onClick({event})}
        >
            {icon &&
                <i
                    className={icon}
                    style={{
                        fontSize: 15,
                        marginRight: 6,
                    }}
                ></i>
            }
            <Text size={size}>
                {children}
            </Text>
        </div>
    )
}