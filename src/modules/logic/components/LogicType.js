import React from 'react'

import { dropdownType } from '../../dropdown/types'
import { logicType, operatorType } from '../types'

import {
    DropClick,
    LogicButton,
 } from '../../components/Common';

export default function LogicType(props) {
    const { logicKey, logicItem, path, vars } = props
    const {
        operatorType: selectedOperator,
        logicType: selectedLogic,
    } = logicItem
    
    const item = selectedOperator ? operatorType[selectedOperator] : (selectedLogic ? logicType[selectedLogic] : {})

    const { title, icon, color = 'darkgrey' } = item

    return (
        <DropClick
            dropdown={dropdownType.pickLogic}
            params={{
                logicKey,
                path,
                vars,
            }}
        >
            <LogicButton
                highlight={color}
                color={color}
                icon={icon || 'pencil'}
                label={title}
            />
        </DropClick>
    )
}