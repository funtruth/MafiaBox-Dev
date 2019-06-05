import React from 'react';
import { palette } from './Standards';

import Text from './Text'
import Row from './Row';

export default function Tag(props) {
    const {
        icon,
        text,
        bold,
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
            <Text size={size} color={color} bold={bold}>
                <Row y="c">
                    {icon &&
                        <i
                            className={'mdi mdi-' + icon}
                            style={{
                                fontSize: 15,
                                marginRight: text || children ? 6 : 0,
                            }}
                        ></i>
                    }
                    {text}
                    {children}
                </Row>
            </Text>
        </div>
    )
}