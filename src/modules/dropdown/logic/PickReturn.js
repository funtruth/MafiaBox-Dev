import React from 'react'
import _ from 'lodash'

import { operatorType } from '../../common/types'
import { DEFAULT_LOGIC } from '../../common/defaults'

import { generateLogic } from '../../logic/codetool';

import {
    DropItem,
    DropTitle,
} from '../components/Common';

export default function PickReturn({
    hoverKey: logicType,
    logicKey,
    slate,
    update,
    showDropdown,
    deleteVariables,
}){
    //Operators have internal logic by default
    let handleSelect = (item) => {
        update({
            ...DEFAULT_LOGIC,
            key: logicKey,
            ...generateLogic(item.key),
            logicType,
            operatorType: item.key,
        })
        showDropdown();
        deleteVariables();
    }

    let renderItem = (item) => {
        const chosen = item.key === slate.operatorType

        return (
            <DropItem
                key={item.key}
                chosen={chosen}
                onClick={() => handleSelect(item)}
                leftIcon={item.icon}
                rightCheck
                text={item.title}
            />
        )
    }
    
    const items = _.filter(operatorType, i => i.logic === logicType)
    return (
        <>
            <DropTitle>return types</DropTitle>
            {items.map(renderItem)}
        </>
    )
}