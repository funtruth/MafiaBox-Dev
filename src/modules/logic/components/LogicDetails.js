import React from 'react'

import { logicType } from '../types'

import LogicDeclareItem from '../details/LogicDeclareItem';
import LogicMutateItem from '../details/LogicMutateItem';
import LogicUpdateItem from '../details/LogicUpdateItem';

export default function LogicDetails(props) {
    const { logicItem, path } = props
    const { data, declare } = logicItem

    return (
        <div className="column" style={{marginBottom: 8}}>
            {declare && Object.keys(declare).map(variable => (
                <LogicDeclareItem
                    {...props}
                    key={variable}
                    item={declare[variable]}
                    path={[...path, 'declare']}
                />
            ))}
            {logicItem.logicType === logicType.variable.key && 
                Object.keys(data).map(field => (
                    <LogicMutateItem
                        {...props}
                        key={field}
                        prefix={field}
                        data={data[field]}
                        path={[...path, 'data']}
                    />
                ))
            }
            {logicItem.logicType === logicType.update.key &&
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