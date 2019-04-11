import React from 'react'

import { logicType } from '../types'

import LogicVarWrapper from '../vars/LogicVarWrapper'
import LogicUpdateItem from '../update/LogicUpdateItem';

export default function LogicDetails(props) {
    const { value, path } = props
    const { data, vars } = value

    return (
        <div className="column">
            {vars && Object.keys(vars).map(variable => (
                <LogicVarWrapper
                    {...props}
                    key={variable}
                    item={vars[variable]}
                    path={[...path, 'vars']}
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