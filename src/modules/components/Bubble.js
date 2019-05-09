import React from 'react';
import { palette } from './Standards';

import Text from './Text'

export default function Bubble(props) {
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
        '--bubble',
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
            <Text size={size}>
                {icon &&
                    <i
                        className={icon}
                        style={{
                            fontSize: 15,
                            marginRight: children ? 3 : 0,
                        }}
                    ></i>
                }
                {children}
            </Text>
        </div>
    )
}