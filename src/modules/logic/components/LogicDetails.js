import React from 'react'
import _ from 'lodash'
import * as proptool from '../proptool'

import { logicType, operatorType } from '../types'

import LogicExpandable from '../form/LogicExpandable';
import LogicVarHeader from '../vars/LogicVarHeader'
import LogicVarProp from '../vars/LogicVarProp'

export default function LogicDetails(props) {
    const { updateRef, logicInfo } = props
    const { 
        data,
        logicType: type,
        operatorType: otype,
    } = logicInfo

    switch(type) {
        case logicType.operator.key:
            switch(otype) {
                case operatorType.forin.key:
                    if (!data.declare) return null
                    return (
                        <div className="row" style={{ marginTop: 2 }}>
                            <div className="common-bubble --var">{data.declare.key}</div>
                        </div>
                    )
                default:
                    return null
            }
        case logicType.variable.key:
            return (
                <div>
                    {_(data)
                        .toArray()
                        .filter(i => i.key)
                        .value()
                        .map(item => (
                            <LogicVarHeader key={item.key}>
                                <div style={{marginRight: 6}}>{item.key}</div>
                                {item && !item.isBeingAssigned &&
                                    <LogicVarProp
                                        {...props}
                                        property="types"
                                        item={item}
                                    />
                                }
                                <LogicVarProp
                                    {...props}
                                    property="assign"
                                    item={item}
                                />
                            </LogicVarHeader>
                        ))
                    }
                </div>
            )
        case logicType.update.key:
            return (
                proptool.getSubfields('', updateRef).map((item, index) => (
                    <LogicExpandable
                        {...props}
                        key={index}
                        property={item.subfield}
                        prefix={item.subfield}
                    />
                ))
            )
        default:
            return null
    }
}