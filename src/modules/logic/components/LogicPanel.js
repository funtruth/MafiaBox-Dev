import React from 'react'
import _ from 'lodash'

import { DropClick, LogicButton } from '../../components/Common';

export default function LogicPanel(props) {
    const {
        pageKey, fieldKey,
        subfieldKey,
        vars,
        logicKey,
        logicItem,
        placeholder,
        dropdown,
        modal,
        path,
        rootPath,
        scope,
        includeSubpath,
    } = props

    //get data of the logic item
    const data = logicItem.data || {}
    //get data of the logic panel
    const dataProp = (subfieldKey ? data[subfieldKey] : data) || {}

    const { display } = dataProp

    if (pageKey)  console.warn('pageKey is being used here.', logicItem)
    if (fieldKey) console.warn('fieldKey is being used here.', logicItem)

    const scopedVars = _.filter(vars, i => !i.scope || scope.includes(i.scope))
    
    return (
        <DropClick
            dropdown={dropdown}
            modal={modal}
            params={{
                subfieldKey,
                currentValue: dataProp,
                attach: data,
                scopedVars,
                logicKey,
                logicItem,
                path,
                rootPath,
                ignoreSubpath: !includeSubpath,
            }}
        >
            <LogicButton color={display ? 'white' : 'grey'}>
                {display || placeholder}
            </LogicButton>
        </DropClick>
    )
}