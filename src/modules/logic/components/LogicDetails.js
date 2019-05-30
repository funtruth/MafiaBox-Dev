import React from 'react'
import _ from 'lodash'

import { logicType } from '../types'

import LogicDeclareItem from '../details/LogicDeclareItem';
import LogicMutateItem from '../details/LogicMutateItem';
import LogicUpdateItem from '../details/LogicUpdateItem';

export default function LogicDetails(props) {
    const { logicItem, path, vars } = props
    const { key, data } = logicItem

    const declaredVars = _.filter(vars, i => i.scope === key)
    console.log({declaredVars})

    return (
        <div className="column" style={{marginBottom: 8}}>
            {declaredVars.map(item => (
                <LogicDeclareItem
                    {...props}
                    key={item.key}
                    item={item}
                    path={[...path, 'declaredVars']}
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