import React from 'react';
import { palette } from './Standards';

import Text from './Text'

export default function Tag(props) {
    const {
        icon,
        children,
        onClick,
        className           = '',
        size                = 's',
        color               = 'whitish',
        bg                  = 'charcoal',
        style,
    } = props

    const classes = [
        '--tag',
        className,
    ].join(" ")

    const buttonStyle = {
        backgroundColor: palette(bg),
        color: palette(color),
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
                        marginRight: children ? 6 : 0,
                    }}
                ></i>
            }
            <Text size={size}>
                {children}
            </Text>
        </div>
    )
}