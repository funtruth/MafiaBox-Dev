import React from 'react'
import _ from 'lodash'

import {
    updateType,
    VAR_DEFAULTS,
    healthUpdateType,
} from '../../logic/types'

import DropTitle from '../components/DropTitle';

export default function PickHealth(props) {
    const { attach, subfieldKey } = props
    const currentValue = attach[subfieldKey] || {}

    const handleSelect = (item) => {
        props.updatePage({
            ...VAR_DEFAULTS,
            value: item.key,
            display: item.title,
            updateType: updateType.health,
        })
        props.showDropdown()
    }

    const renderItem = (item) => {
        const chosen = currentValue.value === item.key

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

    const items = _.sortBy(healthUpdateType, i => i.index)
    return (
        <>
            <DropTitle>health type</DropTitle>
            {items.map(renderItem)}
        </>
    )
}