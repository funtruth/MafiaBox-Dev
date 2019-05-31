import React from 'react'

import { dropdownType } from '../../dropdown/types'
import { logicType, operatorType } from '../types'

import {
    DropClick,
    Icon,
    Text,
    LogicButton,
 } from '../../components/Common';

export default function LogicType(props) {
    const { logicKey, logicItem, path, subpath } = props
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
                subpath,
            }}
        >
            <LogicButton highlight={color} color={color}>
                <Icon className={`${icon || 'mdi mdi-pencil'}`}></Icon>
                {title &&
                    <Text size="s" color="whitish" before="xxs">
                        {title}
                    </Text>
                }
            </LogicButton>
        </DropClick>
    )
}