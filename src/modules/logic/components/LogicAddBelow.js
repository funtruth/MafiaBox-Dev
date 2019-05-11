import React from 'react'
import _ from 'lodash'

import { DEFAULT_LOGIC } from '../../common/defaults'

import {
    Icon,
} from '../../components/Common';
import { genUID } from '../../common/helpers';

export default function LogicAddBelow(props) {
    const { logicKey, parentKey, logicRepo, path } = props
    const { childKeys } = parentKey ? logicRepo[parentKey] : logicRepo

    let handleAdd = () => {
        const newLogicKey = genUID('logic', logicRepo)
        
        const childKeysClone = _.cloneDeep(childKeys)
        childKeysClone.splice(childKeys.indexOf(logicKey) + 1, 0, newLogicKey)

        if (parentKey) {
            props.updateGeneral(path, {
                [newLogicKey]: DEFAULT_LOGIC,
            })
            props.updateGeneral([...path, parentKey], {
                childKeys: childKeysClone,
            })
        } else {
            props.updateGeneral(path, {
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