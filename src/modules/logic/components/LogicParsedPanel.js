import React from 'react'
import _ from 'lodash'

import { DropClick, LogicButton } from '../../components/Common';

export default function LogicParsedPanel(props) {
    const {
        subfieldKey,
        vars,
        logicKey,
        logicItem,
        placeholder,
        dropdown,
        modal,
        onClick,
        path,
        rootPath,
        scope,
        includeSubpath,
    } = props

    const scopedVars = _.filter(vars, i => !i.scope || scope.includes(i.scope))
    
    return (
        <DropClick
            dropdown={dropdown}
            modal={modal}
            onClick={onClick}
            params={{
                subfieldKey,
                scopedVars,
                logicKey,
                logicItem,
                path,
                rootPath,
                ignoreSubpath: !includeSubpath,
            }}
        >
            <LogicButton>
                Untitled
            </LogicButton>
        </DropClick>
    )
}