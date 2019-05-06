import React from 'react';
import { palette } from './Standards'

export default function Separator(props) {
    const {
        t      = 2,
        axis   = 'x',
        bg     = '#464646',
        size   = 0,
    } = props

    const hor = axis === 'x'

    const sepStyle = {
        height: hor ? t : '100%',
        backgroundColor: bg && palette(bg),
        marginTop: hor ? size : 0,
        marginBottom: hor ? size : 0,
        marginLeft: hor ? 0: size,
        marginRight: hor ? 0 : size,
        width: hor ? '100%' : t,
    }

    return (
        <div style={sepStyle}/>
    )
}