import React from 'react'

import { dropdownType } from '../../common/types';

import { DropClick, LogicButton, Text } from '../../components/Common';

export default function LogicDeclareValue({
    item,
    path,
}){
    const noTypeSelected = !item.variableTypes || !item.variableTypes.length
    if (noTypeSelected) return null;

    return (
        <DropClick
            dropdown={dropdownType.pickVarWithType}
            params={{
                item,
                path: [...path, 'declare'],
                baseVar: item,
            }}
        >
            <LogicButton
                highlight="blue"
                color="grey"
            >
                value
                <Text size="s" before="xxs">
                    {item.declare.display}
                </Text>
            </LogicButton>
        </DropClick>
    )
}