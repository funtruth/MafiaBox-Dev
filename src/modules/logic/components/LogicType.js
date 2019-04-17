import React from 'react'

import { dropdownType } from '../../dropdown/types'
import { logicType, operatorType } from '../types'

import {
    DropClick,
    Icon,
    Text,
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

    //TODO add/color the keyword and icon to make UX more readable
    return (
        <DropClick
            className="logic-label"
            dropdown={dropdownType.pickLogic}
            params={{
                attach: value,
                updateSource,
                path,
                subpath,
            }}
            style={{
                color,
                borderLeft: `4px solid ${color}`,
            }}
        >
            <Icon className={`${icon || 'ion-md-create'}`}></Icon>
            {title && <Text size="s" color="whitish" style={{marginLeft: 4}}>{title}</Text>}
        </DropClick>
    )
}