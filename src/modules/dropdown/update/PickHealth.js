import React from 'react'
import _ from 'lodash'

import {
    updateType,
    updateFamilyType,
    VAR_DEFAULTS,
} from '../../logic/types'

import DropTitle from '../components/DropTitle';

export default function PickHealth(props) {
    const { attach, subfieldKey, update, mutate } = props

    const handleSelect = (item) => {
        props.updatePage({
            ...VAR_DEFAULTS,
            update,
            mutate,
            updateViewType: item.updateViewType,
            value: item.key,
        })
        props.showDropdown()
    }

    const renderItem = (item) => {
        const selectedKey = attach[subfieldKey] && attach[subfieldKey].value
        const chosen = typeof selectedKey === 'string' && selectedKey === item.key

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
        .filter(i => i.family === updateFamilyType.health)
        .sortBy(i => i.index)
        .value()

    return (
        <>
            <DropTitle>health type</DropTitle>
            {items.map(renderItem)}
        </>
    )
}