import React from 'react'
import _ from 'lodash'

import {
    dropdownType,
    mathType,
    modalType,
    numUpdateType,
    updateType,
    variableType,
} from '../../common/types'
import {
    DEFAULT_ASSIGN,
    LOGIC_ITEM_VAR,
} from '../../common/defaults';

import {
    DropItem,
    DropParent,
    DropTitle,
} from '../components/Common'
import RelatedVars from '../vars/RelatedVars';

export default function PickNumUpdate(props) {
    const { attach, subfieldKey } = props
    const currentValue = attach[subfieldKey] || {}

    //handle basic setTo
    const setTo = (item, number) => {
        props.updatePage({
            ...LOGIC_ITEM_VAR,
            value: item.key,
            assign: {
                ...DEFAULT_ASSIGN,
                math: mathType.constant,
                value: number,
            },
            display: item.title + ' ' + number,
            updateType: updateType.number,
        })
        props.showDropdown()
    }

    //handle increments/decrements
    const selectDynamic = (item, number) => {
        props.updatePage({
            ...LOGIC_ITEM_VAR,
            value: item.key,
            assign: {
                ...DEFAULT_ASSIGN,
                math: mathType.operation,
                mathOperator: item.mathOperator,
                left: {
                    ...DEFAULT_ASSIGN,
                    math: mathType.value,
                    value: subfieldKey,
                },
                right: {
                    ...DEFAULT_ASSIGN,
                    math: mathType.constant,
                    value: number,
                },
            },
            display: item.title + ' ' + number,
            updateType: updateType.number,
        })
        props.showDropdown()
    }
    
    //show advanced math modal
    const handleAdvanced = () => {
        props.showModal(modalType.editNumber, {
            attach: currentValue,
        });
        props.showDropdown();
    }

    const renderItem = (item) => {
        const chosen = currentValue.value === item.key
        
        return (
            <DropParent
                key={item.key}
                dropdown={dropdownType.inputValue}
                showDropdown={props.showDropdown}
                params={{
                    inputText: 'Enter a number',
                    type: 'number',
                    currentValue: chosen ? currentValue.adjust : "",
                    onSubmit: item.mathOperator ? (n) => selectDynamic(item, n) : (n) => setTo(item, n),
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
                text="equation ..."
            />
            <RelatedVars
                {...props}
                variableTypes={variableType.number.key}
            />
        </>
    )
}