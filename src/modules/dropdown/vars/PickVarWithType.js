import React from 'react'
import _ from 'lodash'

import {
    dropdownType,
    variableType,
    updateType,
} from '../../common/types'
import {
    rssMap,
    VAR_DEFAULTS,
} from '../../common/defaults'

import { VARTYPE_IS_OBJ } from '../../common/arrows';

import BoardLib from '../library/BoardLib';
import {
    DropItem,
    DropParent,
    DropScroll,
    DropTitle,
} from '../components/Common'

export default function PickVarWithType(props) {
    const { attachVar, currentValue } = props

    const handleSelect = (item) => {
        props.updatePage({
            ...VAR_DEFAULTS,
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
                    {...props}
                    key={item.key}
                    dropdownType={dropdownType.pickVarSubfield}
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
            ...VAR_DEFAULTS,
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
    
    const vars = _.groupBy(attachVar, i => i.variableTypes && i.variableTypes.includes(variableType.uid.key))
    const rssVars = _.filter(rssMap, i => i.fieldLength === 2)

    return (
        <>
            {rssVars.length > 0 && <div>
                <DropTitle>game values</DropTitle>
                <DropScroll>{rssVars.map(renderItem)}</DropScroll>
            </div>}
            {vars.true && <div>
                <DropTitle>uids</DropTitle>
                <DropScroll>{vars.true.map(renderItem)}</DropScroll>
            </div>}
            {vars.false && <div>
                <DropTitle>variables</DropTitle>
                <DropScroll>{vars.false.map(renderItem)}</DropScroll>
            </div>}
            <DropTitle>other options</DropTitle>
            <DropParent
                {...props}
                dropdownType={dropdownType.inputValue}
                params={{
                    inputText: 'Enter a number',
                    type: 'number',
                    showValue: true,
                    onSubmit: setAdjustment,
                }}
                icon="mdi mdi-numeric"
                text="adjust by"
            />
            <DropParent
                {...props}
                dropdownType={dropdownType.pickBoolean}
                icon="mdi mdi-code-tags-check"
                text="boolean"
            />
            <DropParent
                {...props}
                dropdownType={dropdownType.inputValue}
                params={{
                    inputText: 'Enter a number',
                    type: 'number',
                    showValue: true,
                    onSubmit: setConstant,
                }}
                icon="mdi mdi-numeric"
                text="constant"
            />
            <DropTitle>library</DropTitle>
            <BoardLib {...props}/>
        </>
    )
}