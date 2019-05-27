import React from 'react'
import _ from 'lodash'

import {
    operatorType,
} from '../../common/types'
import {
    DEFAULT_LOGIC,
} from '../../common/defaults'

import { genUID } from '../../common/helpers';

import {
    DropItem,
    DropTitle,
} from '../components/Common';

export default function PickOperator(props) {
    const { hoverKey, logicItem, logicRepo } = props
    const { childKeys } = logicItem

    const data = _(operatorType)
        .filter(i => i.logicType === hoverKey)
        .orderBy(i => i.index)
        .value()
    
    //Operators have internal logic by default
    let handleSelect = (item) => {
        const childKey = genUID('logic', logicRepo)
        props.updatePage({
            ...DEFAULT_LOGIC,
            logicType: hoverKey,
            operatorType: item.key,
            childKeys: childKeys || [childKey],
        })
        props.showDropdown()
    }

    let renderItem = (item) => {
        const chosen = item.key === logicItem.operatorType

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
    
    return (
        <>
            <DropTitle>operator types</DropTitle>
            {data.map(renderItem)}
        </>
    )
}