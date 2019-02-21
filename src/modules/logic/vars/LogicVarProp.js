import React from 'react'

import { dropdownType } from '../../dropdown/types'
import { modalType } from '../../modal/types';

export default function LogicVarProp(props) {
    const { property, fieldKey, indexKey, item, vars } = props

    let handleModal = () => {
        props.showModal(modalType.assignVar, {
            fieldKey,
            indexKey,
            subfieldKey: item.key,
            attachVar: vars,
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
                            fieldKey,
                            indexKey,
                            subfieldKey: item.key,
                            currentValue: item.variableTypes,
                        })}
                        highlight="true"
                    >
                        todo
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
                        todo
                    </div>
                </div>
            )
        default:
            return null
    }
}