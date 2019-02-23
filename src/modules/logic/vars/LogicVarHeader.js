import React from 'react'

export default function LogicVarHeader(props) {
    return (
        <div className="row-nowrap" style={{ marginTop: 2 }}>
            <div className="common-bubble --var">
                {props.children}
            </div>
        </div>
    )
}