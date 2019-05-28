import React from 'react';
import { palette } from './Standards'

export default function Separator(props) {
    const {
        t      = 2,
        axis   = 'x',
        bg     = 'darkgrey',
        size   = 0,
    } = props

    const hor = axis === 'x'

    const sepStyle = {
        height: hor && t,
        width: !hor && t,
        backgroundColor: bg && palette(bg),
        marginTop: hor ? size : 0,
        marginBottom: hor ? size : 0,
        marginLeft: hor ? 0: size,
        marginRight: hor ? 0 : size,
    }

    return (
        <div style={sepStyle}/>
    )
}