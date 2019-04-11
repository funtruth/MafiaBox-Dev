import React from 'react'

import { logicType } from '../types'

import LogicVarWrapper from '../vars/LogicVarWrapper'
import LogicUpdateItem from '../update/LogicUpdateItem';

export default function LogicDetails(props) {
    const { value, path } = props
    const { data, declare, assign } = value

    return (
        <div className="column">
            {declare && Object.keys(declare).map(variable => (
                <LogicVarWrapper
                    {...props}
                    key={variable}
                    item={declare[variable]}
                    path={[...path, 'declare']}
                />
            ))}
            {assign && Object.keys(assign).map(variable => (
                <LogicVarWrapper
                    {...props}
                    key={variable}
                    item={assign[variable]}
                    path={[...path, 'assign']}
                />
            ))}
            {value.logicType === logicType.update.key &&
                Object.keys(data).map(field => (
                    <LogicUpdateItem
                        {...props}
                        key={field}
                        prefix={field}
                        data={data[field]}
                        path={[...path, 'data']}
                    />
                ))
            }
        </div>
    )
}