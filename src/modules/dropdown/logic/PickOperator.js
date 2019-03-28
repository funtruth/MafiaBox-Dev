import React from 'react'
import _ from 'lodash'

import { operatorType, DEFAULT_LOGIC } from '../../logic/types'

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
            data: "",
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