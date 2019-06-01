import React from 'react'
import _ from 'lodash'

import {
    dropdownType,
    parseType,
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

export default function PickVarWithType(props){
    const { slate, baseVar, update, showDropdown } = props

    const handleSelect = (item) => {
        update({
            ...LOGIC_ITEM_VAR,
            value: item.key,
            nativeValue: item.key,
            parseBy: parseType.variable,
            display: item.key,
            variableTypes: item.variableTypes,
        })
        showDropdown()
    }

    const renderItem = (item) => {
        const chosen = slate.value === item.key

        if (VARTYPE_IS_OBJ(item)) {
            return (
                <DropParent
                    key={item.key}
                    dropdown={dropdownType.pickVarSubfield}
                    showDropdown={showDropdown}
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