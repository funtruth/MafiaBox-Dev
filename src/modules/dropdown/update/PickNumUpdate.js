import React from 'react'
import _ from 'lodash'

import {
    numUpdateType,
    updateViewType,
    VAR_DEFAULTS,
} from '../../logic/types'
import { dropdownType } from '../types'

import {
    DropParent,
    DropTitle,
} from '../components/Common'

export default function PickNumUpdate(props) {
    const { attach, subfieldKey } = props

    const currentValue = attach[subfieldKey] || {}
    const currentKey = currentValue.value

    //defaults => update: true, mutate: false
    const updateValue = {
        update: currentValue.update === undefined ? true : currentValue.update,
        mutate: currentValue.mutate === undefined ? false : currentValue.mutate,
    }

    const selectDynamic = (item, number) => {
        props.updatePage({
            ...VAR_DEFAULTS,
            ...updateValue,
            value: item.key,
            adjust: number,
            display: item.title + ' ' + number,
            updateViewType: item.updateViewType,
        })
        props.showDropdown()
    }
    
    const handleSelect = (item) => {
        props.updatePage({
            ...VAR_DEFAULTS,
            ...updateValue,
            value: item.key,
            display: item.key,
            updateViewType: item.updateViewType,
        })
        props.showDropdown()
    }

    const renderItem = (item) => {
        const chosen = currentKey === item.key
        
        if (item.showInput) {
            return (
                <DropParent
                    {...props}
                    key={item.key}
                    dropdownType={dropdownType.inputValue}
                    params={{
                        inputText: 'Enter a number',
                        type: 'number',
                        showValue: chosen,
                        onSubmit: (n) => selectDynamic(item, n),
                    }}
                    icon={item.icon}
                    text={item.title}
                    chosen={chosen}
                />
            )
        }

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

    const items = _.sortBy(numUpdateType, i => i.index)
    return (
        <>
            <DropTitle>update value</DropTitle>
            {items.map(renderItem)}
        </>
    )
}