import React from 'react'

import { dropdownType } from '../../dropdown/types'
import { variableType } from '../types';

export default function LogicVarType(props) {
    const { item, path } = props

    let newPath = [...path, item.key]

    return (
        <div className="row-nowrap">
            <div
                className="common-bubble --grey27"
                style={{
                    borderRadius: '6px 0px 0px 6px',
                }}
            >
                types
            </div>
            <div
                className="logic-pick-update app-onclick"
                menu-type={dropdownType.declareVarType}
                app-onclick-props={JSON.stringify({
                    currentValue: item.variableTypes,
                    path: newPath,
                })}
                highlight="true"
                style={{
                    borderRadius: '0px 6px 6px 0px',
                }}
            >
                {item.variableTypes.map(type => <i key={type} className={`${variableType[type].icon} letter-s`}/>)}
                {item.variableTypes.length === 0 && '...'}
            </div>
        </div>
    )
}