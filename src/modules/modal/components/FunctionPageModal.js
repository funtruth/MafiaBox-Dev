import React from 'react'
import FunctionPageView from '../../functions/FunctionPageView'

export default function FunctionPageModal(props) {
    return (
        <div
            style={{
                minHeight: 400,
                minWidth: 600,
                height: '60vh',
                width: '65vw',
                overflow: 'scroll',
            }}
        >
            <FunctionPageView {...props}/>
        </div>
    )
}