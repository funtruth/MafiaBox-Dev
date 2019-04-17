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
    const { value, path, subpath, updateSource } = props
    const {
        operatorType: selectedOperator,
        logicType: selectedLogic,
    } = value
    
    const item = selectedOperator ?
        operatorType[selectedOperator]
        :(selectedLogic ? logicType[selectedLogic] : {})

    const {
        title,
        icon,
        color = '#767676',
    } = item

    return (
        <DropClick
            dropdown={dropdownType.pickLogic}
            params={{
                attach: value,
                updateSource,
                path,
                subpath,
            }}
        >
            <LogicButton highlight={color} style={{color}}>
                <Icon className={`${icon || 'mdi mdi-pencil'}`}></Icon>
                {title && <Text size="s" color="whitish" style={{marginLeft: 4}}>{title}</Text>}
            </LogicButton>
        </DropClick>
    )
}