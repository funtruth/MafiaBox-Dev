import React from 'react'
import _ from 'lodash'

import {
    updateType,
    numUpdateType,
    VAR_DEFAULTS,
} from '../../logic/types'
import { dropdownType } from '../types'

import {
    DropItem,
    DropParent,
    DropTitle,
} from '../components/Common'

export default function PickNumUpdate(props) {
    const { attach, subfieldKey } = props
    const currentValue = attach[subfieldKey] || {}

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
            updateType: updateType.number,
        })
        props.showDropdown()
    }
    
    const handleSelect = (item) => {
        props.updatePage({
            ...VAR_DEFAULTS,
            ...updateValue,
            value: item.key,
            display: item.key,
            updateType: updateType.number,
        })
        props.showDropdown()
    }

    const renderItem = (item) => {
        const chosen = currentValue.value === item.key
        
        if (item.showInput) {
            return (
                <DropParent
                    {...props}
                    key={item.key}
                    dropdownType={dropdownType.inputValue}
                    params={{
                        inputText: 'Enter a number',
                        type: 'number',
                        currentValue: chosen ? currentValue.adjust : "",
                        onSubmit: (n) => selectDynamic(item, n),
                    }}
                    icon={item.icon}
                    text={item.title}
                    chosen={chosen}
                />
            )
        }

        return (
            <DropItem
                key={item.key}
                chosen={chosen}
                onClick={() => handleSelect(item)}
                leftIcon={item.icon}
                rightIcon="mdi mdi-check"
            >
                {item.title}
            </DropItem>
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