import React from 'react';

import { palette } from './Standards';
import { Row, Icon, Text } from './Common';

export default function LogicButton(props) {
    const {
        children,
        icon,
        label,
        text,
        placeholder,
        onClick,
        disabled,
        className   = '',
        bg          = 'charcoal',
        style,
        highlight,
        color       = 'whitish',
    } = props

    const classes = [
        'text-ellipsis',
        onClick && !disabled ? 'drop-click' : '',
        disabled ? 'drop-click-frozen' : '',
        className,
    ].join(" ")

    const buttonStyle = {
        font: '500 14px Segoe UI',
        padding: '4px 8px',
        color: palette(color),
        backgroundColor: palette(bg),
        borderLeft: `${highlight ? 4 : 2}px solid ${palette(highlight || 'darkgrey')}`,
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
            {icon && <Icon icon={icon}></Icon>}
            {label && <Text size="s" color="whitish" before={icon ? "xxs" : ""}>{label}</Text>}
            {text && <Text size="s" color={color || 'grey'} before={icon || label ? "xxs" : ""}>{text}</Text>}
            {!text && <Text size="s" color="grey" before={icon && placeholder ? "xxs" : ""}>{placeholder}</Text>}
            {children}
        </Row>
    )
}