import React from 'react'
import _ from 'lodash'

import {
    dropdownType,
    updateType,
} from '../../common/types'
import {
    LOGIC_ITEM_VAR,
} from '../../common/defaults'

import { VARTYPE_IS_OBJ } from '../../common/arrows';

import RelatedVars from './RelatedVars';
import {
    DropEmpty,
    DropItem,
    DropParent,
    DropTitle,
} from '../components/Common'

export default function PickVarWithType(props) {
    const { attach, currentValue } = props
    const { baseVar } = attach || {}

    const handleSelect = (item) => {
        props.updatePage({
            ...LOGIC_ITEM_VAR,
            updateType: updateType.uid,
            value: item.key,
            display: item.key,
            variableTypes: item.variableTypes,
        })
        props.showDropdown()
    }

    const renderItem = (item) => {
        const chosen = currentValue.value === item.key

        if (VARTYPE_IS_OBJ(item)) {
            return (
                <DropParent
                    key={item.key}
                    dropdown={dropdownType.pickVarSubfield}
                    showDropdown={props.showDropdown}
                    params={{
                        prefix: item.key,
                    }}
                    text={item.key}
                />
            )
        }

        return (
            <DropItem
                key={item.key}
                chosen={chosen}
                onClick={() => handleSelect(item)}
                rightCheck
                text={item.key}
            />
        )
    }

    const setConstant = (value) => {
        props.updatePage({
            ...LOGIC_ITEM_VAR,
            adjust: value,
            display: value,
            updateType: updateType.number,
        })
        props.showDropdown()
    }

    const setAdjustment = (value) => {
        props.updatePage({
            ...currentValue,
            adjust: value,
            display: currentValue.value + (value > 0 ? '+' : '') + value,
            updateType: updateType.number,
        })
        props.showDropdown()
    }

    if (!baseVar || !baseVar.variableTypes) {
        return (
            <>
                <DropTitle>error</DropTitle>
                <DropEmpty text="select a variable first ..."/>
            </>
        )
    }
    
    return (
        <>
            <RelatedVars {...props} variableTypes={baseVar.variableTypes}/>
        </>
    )
}