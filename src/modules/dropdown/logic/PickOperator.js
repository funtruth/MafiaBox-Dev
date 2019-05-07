import React from 'react'
import _ from 'lodash'

import {
    operatorType,
} from '../../common/types'
import {
    DEFAULT_LOGIC,
} from '../../common/defaults'

import DropTitle from '../components/DropTitle';

export default function PickOperator(props) {
    const { hoverKey, attach } = props

    const data = _(operatorType)
        .filter(i => i.logicType === hoverKey)
        .orderBy(i => i.index)
        .value()
    
    //Operators have internal logic by default
    let handleSelect = (item) => {
        props.updatePage({
            ...DEFAULT_LOGIC,
            down: attach.down,
            logicType: hoverKey,
            operatorType: item.key,
            right: attach.right || DEFAULT_LOGIC,
        })
        props.showDropdown()
    }

    let renderItem = (item) => {
        const chosen = item.key === attach.operatorType

        return (
            <div
                key={item.key}
                className="drop-down-menu-option"
                chosen={chosen.toString()}
                onClick={() => handleSelect(item)}
                style={{
                    backgroundColor: chosen && item.color,
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