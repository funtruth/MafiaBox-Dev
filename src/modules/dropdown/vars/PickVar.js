import React from 'react'
import _ from 'lodash'

import {
    dropdownType,
    updateType,
} from '../../common/types'
import {
    rssMap,
    VAR_DEFAULTS,
} from '../../common/defaults'

import { VARTYPE_IS_OBJ, getVarTypeIcon } from '../../common/arrows';
import { parseJS } from '../../logic/proptool';

import {
    DropItem,
    DropParent,
    DropScroll,
    DropTitle,
} from '../components/Common'

export default function PickVar(props) {
    const { attachVar, currentValue } = props

    const handleSelect = (item) => {
        props.updatePage({
            ...VAR_DEFAULTS,
            value: item.key,
            display: parseJS(item.key),
            variableTypes: item.variableTypes,
            updateType: updateType.uid, //TODO wtf lol
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
                leftIcon={getVarTypeIcon(item.variableTypes)}
                rightCheck
                text={item.key}
            />
        )
    }
    
    const vars = _.sortBy(attachVar, VARTYPE_IS_OBJ)
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