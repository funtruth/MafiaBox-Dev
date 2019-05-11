import React from 'react'
import _ from 'lodash'

import {
    variableType, 
    dropdownType,
} from '../../common/types'

export default function VariableField(props) {
    const { value, path } = props

    return (
        <div className="row -x-p">
            {_(value)
                .toArray()
                .filter(i => i.name)
                .value()
                .map((item, index) => {
                    const pathWithTag = [...path, item.key]

                    return (
                        <div key={index} className="row">
                            <div
                                className="logic-label app-onclick"
                                menu-type={dropdownType.writeVarType}
                                app-onclick-props={JSON.stringify({
                                    currentValue: item.variableTypes, //TODO this needs ot be mapped now
                                    path: pathWithTag,
                                })}
                                style={{
                                    color: '#fff',
                                    borderRadius: '4px 0px 0px 4px',
                                    backgroundColor: 'hsla(0,0%,100%,.1)',
                                }}
                            >
                                {item.variableTypes && item.variableTypes.map(type => (
                                    <i key={type} className={`${variableType[type].icon}`}/>
                                ))}
                                {(!item.variableTypes || !item.variableTypes.length) && '...'}
                            </div>
                            <div
                                className="property-button app-onclick"
                                menu-type={dropdownType.editVarName}
                                app-onclick-props={JSON.stringify({
                                    attachVar: value,
                                    path: pathWithTag,
                                    currentValue: item.name,
                                })}
                                style={{
                                    backgroundColor: 'rgba(40, 43, 48,1)',
                                    marginRight: 6,
                                }}
                            >
                                {item.name}
                            </div>
                        </div>
                    )
                })}
            <div
                className="property-button app-onclick"
                menu-type={dropdownType.addVar}
                app-onclick-props={JSON.stringify({
                    attachVar: value,
                    path,
                })}
                style={{
                    backgroundColor: 'hsla(0,0%,100%,.1)',
                }}
            >
                add var
            </div>
        </div>
    )
}