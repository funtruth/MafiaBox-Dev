import React from 'react'

import UpdateButton from '../form/UpdateButton'

export default function LogicVarProp(props) {
    const { nested, property, config } = props
    
    return (
        <div className="row-nowrap" style={{ marginTop: 2, marginLeft: nested ? 12 : 0 }}>
            <div
                className="common-bubble --grey27"
                style={{
                    cursor: 'pointer',
                }}
            >
                {property}
            </div>
            <UpdateButton {...props} config={config}/>
        </div>
    )
}