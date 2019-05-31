import React from 'react'
import _ from 'lodash'

import { logicType } from '../types'

import LogicMutateItem from '../details/LogicMutateItem';
import LogicUpdateItem from '../details/LogicUpdateItem';
import LogicDeclare from './LogicDeclare';

export default function LogicDetails(props) {
    const { logicItem, path } = props
    const { data } = logicItem

    return (
        <div className="column" style={{marginBottom: 8}}>
            <LogicDeclare {...props}/>
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