import React from 'react'
import _ from 'lodash'

import {
    updateType,
    numUpdateType,
    VAR_DEFAULTS,
} from '../../logic/types'
import {
    DEFAULT_ASSIGN,
    mathType,
} from '../../modal/vars/components/types';
import { dropdownType } from '../types'
import { modalType } from '../../modal/types'

import {
    DropItem,
    DropParent,
    DropTitle,
} from '../components/Common'

export default function PickNumUpdate(props) {
    const { attach, subfieldKey } = props
    const currentValue = attach[subfieldKey] || {}

    const setTo = (item, number) => {
        props.updatePage({
            ...VAR_DEFAULTS,
            value: item.key,
            assign: {
                ...DEFAULT_ASSIGN,
                mathType: mathType.number,
                value: number,
            },
            display: item.title + ' ' + number,
            updateType: updateType.number,
        })
        props.showDropdown()
    }

    const selectDynamic = (item, number) => {
        props.updatePage({
            ...VAR_DEFAULTS,
            value: item.key,
            assign: {
                ...DEFAULT_ASSIGN,
                mathType: mathType.operation,
                mathOperatorType: item.mathOperatorType,
                left: {
                    ...DEFAULT_ASSIGN,
                    mathType: mathType.variable,
                    value: subfieldKey,
                },
                right: {
                    ...DEFAULT_ASSIGN,
                    mathType: mathType.number,
                    value: number,
                },
            },
            display: item.title + ' ' + number,
            updateType: updateType.number,
        })
        props.showDropdown()
    }
    
    const handleAdvanced = () => {
        props.showModal(modalType.assignNum, {
            attach: currentValue,
        });
        props.showDropdown();
    }

    const renderItem = (item) => {
        const chosen = currentValue.value === item.key
        
        return (
            <DropParent
                {...props}
                key={item.key}
                dropdownType={dropdownType.inputValue}
                params={{
                    inputText: 'Enter a number',
                    type: 'number',
                    currentValue: chosen ? currentValue.adjust : "",
                    onSubmit: item.mathOperatorType ? (n) => selectDynamic(item, n) : (n) => setTo(item, n),
                }}
                icon={item.icon}
                text={item.title}
                chosen={chosen}
            />
        )
    }

    const items = _.sortBy(numUpdateType, i => i.index)
    return (
        <>
            <DropTitle>update value</DropTitle>
            {items.map(renderItem)}
            <DropItem
                onClick={handleAdvanced}
                leftIcon="mdi mdi-calculator"
            >
                equation ...
            </DropItem>
        </>
    )
}