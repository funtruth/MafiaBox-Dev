import React from 'react'
import _ from 'lodash'

import { logicType, operatorType } from '../types'

import LogicVarWrapper from '../vars/LogicVarWrapper'
import LogicUpdateItem from '../update/LogicUpdateItem';

export default function LogicDetails(props) {
    const { value } = props
    const { 
        data,
        logicType: type,
        operatorType: otype,
    } = value

    switch(type) {
        case logicType.operator.key:
            switch(otype) {
                case operatorType.forin.key:
                    if (!data || !data.declare) return null
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
            console.log({data})
            return (
                <div className="column">
                    {Object.keys(data).map((field, index) => (
                        <LogicUpdateItem
                            {...props}
                            key={field}
                            prefix={field}
                            data={data[field]}
                        />
                    ))}
                </div>
            )
        default:
            return null
    }
}