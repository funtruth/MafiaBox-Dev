import React from 'react';
import { palette } from './Standards';

import Text from './Text'
import Row from './Row';

export default function Tag(props) {
    const {
        icon,
        children,
        onClick,
        disabled,
        className           = '',
        size                = 's',
        color               = 'whitish',
        bg                  = 'charcoal',
        style,
    } = props

    const classes = [
        '--tag',
        onClick && !disabled ? '--onclick' : '',
        disabled ? 'drop-click-frozen' : '',
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
            onClick={event => onClick && onClick(event)}
        >
            <Text size={size} color={color}>
                <Row y="c">
                    {icon &&
                        <i
                            className={icon}
                            style={{
                                fontSize: 15,
                                marginRight: children ? 6 : 0,
                            }}
                        ></i>
                    }
                    {children}
                </Row>
            </Text>
        </div>
    )
}