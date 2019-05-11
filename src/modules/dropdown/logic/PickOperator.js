import React from 'react'
import _ from 'lodash'

import {
    operatorType,
} from '../../common/types'
import {
    DEFAULT_LOGIC,
} from '../../common/defaults'

import { genUID } from '../../common/helpers';
import { palette } from '../../components/Standards';

import DropTitle from '../components/DropTitle';

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
            <div
                key={item.key}
                className="drop-down-menu-option"
                chosen={chosen.toString()}
                onClick={() => handleSelect(item)}
                style={{
                    backgroundColor: chosen && palette(item.color),
                }}
            >
                <i className={`${item.icon} drop-down-menu-icon`}/>
                {item.title}
                <i className="mdi mdi-check"/>
            </div>
        )
    }
    
    return (
        <>
            <DropTitle>operator types</DropTitle>
            {data.map(renderItem)}
        </>
    )
}