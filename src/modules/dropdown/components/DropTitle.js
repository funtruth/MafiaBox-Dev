import React from 'react'
import { DROP_TITLE_HEIGHT } from '../types'

export default function DropTitle({children}) {
    return (
        <div className="row drop-title" style={{ alignItems: 'center', height: DROP_TITLE_HEIGHT }}>
            <div style={{
                height: 2,
                width: 10,
                backgroundColor: '#464646',
            }}/>
            <div className="drop-down-title">{children}</div>
            <div style={{
                height: 2,
                flexGrow: 1,
                backgroundColor: '#464646',
                minWidth: 10,
            }}/>
        </div>
    )
}