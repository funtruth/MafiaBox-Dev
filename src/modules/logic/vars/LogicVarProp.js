import React from 'react'

import { dropdownType } from '../../dropdown/types'
import { modalType } from '../../modal/types';
import { variableType } from '../types';
import { orderOfOp } from '../../modal/vars/calc/ops'

export default function LogicVarProp(props) {
    const { property, item, vars, path } = props

    let newPath = [...path, 'data', item.key]

    let handleModal = () => {
        props.showModal(modalType.assignVar, {
            attachVar: vars,
            attach: item,
            path: newPath,
        })
    }
    
    switch(property) {
        case 'types':
            return (
                <div className="row-nowrap" style={{ marginTop: 2, marginLeft: 12 }}>
                    <div className="common-bubble --grey27">{property}</div>
                    <div
                        className="logic-pick-update app-onclick"
                        menu-type={dropdownType.pickVarType}
                        app-onclick-props={JSON.stringify({
                            currentValue: item.variableTypes,
                            path: newPath,
                        })}
                        highlight="true"
                    >
                        {item.variableTypes.map(type => <i key={type} className={`${variableType[type].icon}`}/>)}
                        {item.variableTypes.length === 0 && '...'}
                    </div>
                </div>
            )
        case 'assign':
            return (
                <div className="row-nowrap" style={{ marginTop: 2, marginLeft: 12 }}>
                    <div className="common-bubble --grey27">{property}</div>
                    <div
                        className="logic-pick-update"
                        highlight="true"
                        onClick={handleModal}
                    >
                        {orderOfOp(item.assign)}
                    </div>
                </div>
            )
        default:
            return null
    }
}