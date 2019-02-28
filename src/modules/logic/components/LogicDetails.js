import React from 'react'
import _ from 'lodash'
import * as proptool from '../proptool'

import { logicType, operatorType } from '../types'

import LogicExpandable from '../form/LogicExpandable';
import LogicVarWrapper from '../vars/LogicVarWrapper'

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
                        .map(item => <LogicVarWrapper key={item.key} {...props} item={item}/>)
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