import React from 'react'

import {
    parseType,
    variableType,
} from '../../common/types'
import { LOGIC_ITEM_VAR } from '../../common/defaults';

import { DropTitle } from '../components/Common'
import { Input } from '../../components/Common'

/*
    PickTypeNumber
    edits a LOGIC_ITEM_VAR directly by path,
    sets as parseType.constant because parseType.number reads through value.byId / value.source
*/
export default function VarItemConstant({
    slate,
    update,
    showDropdown,
}){
    const submit = (value) => {
        update({
            ...LOGIC_ITEM_VAR,
            display: value,
            parseBy: parseType.constant,
            value: parseInt(value),
            variableTypes: [variableType.number.key],
        })
        showDropdown();
    }

    return (
        <>
            <DropTitle>set to number</DropTitle>
            <Input
                theme="tag"
                value={slate.value}
                onSubmit={submit}
                showSubmit
                placeholder="enter a value ..."
                type="number"
                outerprops={{
                    sizes: ['z', 'xs'],
                }}
            />
        </>
    )
}