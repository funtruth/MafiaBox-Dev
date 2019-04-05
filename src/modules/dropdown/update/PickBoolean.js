import React from 'react'
import _ from 'lodash'

import {
    updateType,
    updateFamilyType,
    panelType,
    variableType,
    VAR_DEFAULTS,
} from '../../logic/types'

import DropTitle from '../components/DropTitle';

export default function PickBoolean(props) {
    const { attach, subfieldKey } = props

    const handleSelect = (item) => {
        props.updatePage({
            ...VAR_DEFAULTS,
            update: item.update,
            mutate: item.mutate,
            panelType: panelType.var.key,
            updateViewType: item.updateViewType,
            value: item.key,
            variableTypes: [variableType.boolean.key],
        })
        props.showDropdown()
    }

    const renderItem = (item) => {
        const value = attach[subfieldKey] && attach[subfieldKey].value
        const chosen = typeof value === 'string' && value === item.key
        
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
    }

    let items = _(updateType)
        .filter(i => i.family === updateFamilyType.boolean)
        .sortBy(i => i.index)
        .value()
    
    return (
        <>
            <DropTitle>boolean type</DropTitle>
            {items.map(renderItem)}
        </>
    )
}