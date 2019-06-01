import React from 'react'
import _ from 'lodash'

import {
    dropdownType,
    updateType,
    parseType,
} from '../../common/types'
import {
    rssMap,
    LOGIC_ITEM_VAR,
} from '../../common/defaults'

import { VARTYPE_IS_OBJ, getVarTypeIcon } from '../../common/arrows';
import { parseJS } from '../../logic/proptool';

import {
    DropItem,
    DropParent,
    DropScroll,
    DropTitle,
} from '../components/Common'

//Used from: LogicParsed
export default function PickVar({
    slate,
    scopedVars,
    showDropdown,
    update,
}) {
    const handleSelect = (item) => {
        update({
            ...LOGIC_ITEM_VAR,
            display: parseJS(item.key),
            value: item.key,
            nativeValue: item.key,
            parseBy: parseType.variable,
            variableTypes: item.variableTypes,
        })
        showDropdown();
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
                leftIcon={getVarTypeIcon(item.variableTypes)}
                rightCheck
                text={item.key}
            />
        )
    }
    
    const vars = _.sortBy(scopedVars, VARTYPE_IS_OBJ)
    const rssVars = _.filter(rssMap, i => i.fieldLength === 2)

    return (
        <>
            {rssVars.length > 0 && <div>
                <DropTitle>game values</DropTitle>
                <DropScroll>{rssVars.map(renderItem)}</DropScroll>
            </div>}
            <DropTitle>variables</DropTitle>
            <DropScroll>{vars.map(renderItem)}</DropScroll>
        </>
    )
}