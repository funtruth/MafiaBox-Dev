import React, { useState } from 'react'

import {
    parseType,
    variableType,
} from '../../common/types'
import {
    LOGIC_ITEM_VAR,
} from '../../common/defaults';

import { useAutofocus } from '../../hooks/Hooks'

import {
    DropSubmit,
    DropTitle,
} from '../components/Common'
import { Row } from '../../components/Common'

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
    const focusRef = useAutofocus()

    const [value, setValue] = useState(slate.value)
    const handleChange = e => setValue(e.target.value)

    const submit = () => {
        update({
            ...LOGIC_ITEM_VAR,
            display: value,
            parseBy: parseType.constant,
            value,
            variableTypes: [variableType.number.key],
        })
        showDropdown();
    }

    const onKeyDown = e => {
        switch(e.nativeEvent.key) {
            case 'Enter':
                submit()
                break
            default:
        }
    }

    return (
        <>
            <DropTitle>set to number</DropTitle>
            <Row sizes={['z', 'xs']}>
                <input
                    ref={focusRef}
                    className="tag-input"
                    value={value}
                    onChange={handleChange}
                    onKeyDown={onKeyDown}
                    placeholder="enter a value ..."
                    type='number'
                />
                <DropSubmit onClick={submit}/>
            </Row>
        </>
    )
}