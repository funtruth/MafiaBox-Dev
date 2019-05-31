import React from 'react'
import _ from 'lodash'

import {
    operatorType,
} from '../../common/types'
import {
    DEFAULT_LOGIC,
} from '../../common/defaults'

import generatePushID from '../../common/generatePushID';
import { generateLogic } from '../../logic/codetool';

import {
    DropItem,
    DropTitle,
} from '../components/Common';

export default function PickOperator({
    hoverKey: logicType,
    logicKey,
    slate,
    showDropdown,
    update,
}){
    const { byIndex } = slate
    
    //Operators have internal logic by default
    let handleSelect = (item) => {
        update({
            ...DEFAULT_LOGIC,
            key: logicKey,
            byIndex: byIndex || [generatePushID('logic')],
            ...generateLogic(item.key),
            logicType,
            operatorType: item.key,
        })
        showDropdown();
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
    
    const items = _(operatorType)
        .filter(i => i.logicType === logicType)
        .orderBy(i => i.index)
        .value()

    return (
        <>
            <DropTitle>operator types</DropTitle>
            {items.map(renderItem)}
        </>
    )
}