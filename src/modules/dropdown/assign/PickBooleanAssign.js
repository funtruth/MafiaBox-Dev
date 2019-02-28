import React from 'react'
import _ from 'lodash'

import { updateType, updateFamilyType, variableType } from '../../logic/types'

import DropTitle from '../components/DropTitle';

export default function PickBooleanAssign(props) {
    const { attach, subfieldKey } = props
    const selectedValue = attach[subfieldKey] && attach[subfieldKey].value

    let handleSelect = (item) => {
        props.updatePage({
            value: item.key,
            variableTypes: [variableType.boolean.key],
        })
        props.showDropdown()
    }

    let items = _(updateType)
        .filter(i => i.family === updateFamilyType.boolean)
        .sortBy(i => i.index)
        .value()
    
    return (
        <div>
            <DropTitle>boolean type</DropTitle>
            {items.map(item => {
                const chosen = typeof selectedValue === 'string' && selectedValue === item.key
                
                return (
                    <div
                        key={item.key}
                        className="drop-down-menu-option"
                        chosen={chosen.toString()}
                        onClick={() => handleSelect(item)}
                    >
                        <i className={`${item.icon} drop-down-menu-icon`}/>
                        {item.title}
                        <i className="mdi mdi-check"/>
                    </div>
                )
            })}
        </div>
    )
}