import React from 'react'

import LogicVarType from '../vars/LogicVarType'
import LogicVarAssign from '../vars/LogicVarAssign'

export default function LogicDetails(props) {
    const { item, vars } = props

    const undeclaredVar = item.isBeingAssigned && (!vars || !vars[item.key])
    const theme = {
        backgroundColor: undeclaredVar ? '#db4757' : '#18449b',
    }

    return (
        <div className="row-nowrap" style={{ marginTop: 2 }}>
            <div className="common-bubble" style={theme}>
                <div style={{marginRight: 6}}>{item.key}</div>
                {item && !item.isBeingAssigned && <LogicVarType {...props} item={item}/>}
                <LogicVarAssign {...props} item={item}/>
            </div>
        </div>
    )
}
                            