import React from 'react'
import _ from 'lodash'

import { DEFAULT_LOGIC } from '../../common/defaults'

import {
    Icon,
} from '../../components/Common';
import { genUID } from '../../common/helpers';

export default function LogicAddBelow(props) {
    const { logicKey, parentKey, value, path } = props
    const { childKeys } = parentKey ? value[parentKey] : value

    let handleAdd = () => {
        const newLogicKey = genUID('logic', value)
        
        const childKeysClone = _.cloneDeep(childKeys)
        childKeysClone.splice(childKeys.indexOf(logicKey) + 1, 0, newLogicKey)

        if (parentKey) {
            props.updatePage(path, {
                [newLogicKey]: DEFAULT_LOGIC,
            })
            props.updatePage([...path, parentKey], {
                childKeys: childKeysClone,
            })
        } else {
            props.updatePage(path, {
                [newLogicKey]: DEFAULT_LOGIC,
                childKeys: childKeysClone,
            })
        }
    }

    return (
        <div className="logic-panel-add">
            <Icon className="mdi mdi-server-plus" size="l" color="grey" hover onClick={handleAdd}></Icon>
        </div>
    )
}