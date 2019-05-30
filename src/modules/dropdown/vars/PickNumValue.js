import React, { useState } from 'react'
import _ from 'lodash'

import {
    variableType, mathType,
} from '../../common/types'
import {
    DEFAULT_ASSIGN,
    VAR_DEFAULTS,
} from '../../common/defaults';

import {
    useAutofocus,
} from '../../hooks/Hooks'
import { genUID } from '../../common/helpers';

import {
    DropSubmit,
    DropTitle,
} from '../components/Common'
import { Row } from '../../components/Common'

/*
LOCATION
    NumberView.ActiveOp.ValueDrop
PURPOSE
    shown when the user clicks an empty ValueDrop
    Content:
        Input for <number>
*/
export default function PickNumValue({
    mathKey,
    item,
    side,
    slate,
    update,
    showDropdown,
}){
    const focusRef = useAutofocus()

    const [value, setValue] = useState(mathKey ? slate.value : "")//TODO
    const handleChange = e => setValue(e.target.value)

    //changing value @ byId.[mathKey].value
    const updateSlate = () => {
        update({
            ...VAR_DEFAULTS,
            display: value,
            value,
            variableTypes: [variableType.number.key],
        })
        showDropdown();
    }

    //setting value to an empty ValueDrop @ byId
    const setSlate = () => {
        const newKey = genUID('math', slate)
        
        update({
            [item.key]: {
                ...item,
                [side]: newKey,
            },
            [newKey]: {
                ...DEFAULT_ASSIGN,
                key: newKey,
                math: mathType.constant,
                value: {
                    ...VAR_DEFAULTS,
                    display: value,
                    value,
                    variableTypes: [variableType.number.key],
                },
            },
        })
        showDropdown();
    }

    const onSubmit = () => {
        if (!mathKey) {
            setSlate();
        } else {
            updateSlate();
        }
        showDropdown();
    }

    const onKeyDown = e => {
        switch(e.nativeEvent.key) {
            case 'Enter':
                onSubmit()
                break
            default:
        }
    }

    return (
        <>
            <DropTitle>set to number</DropTitle>
            <Row>
                <input
                    ref={focusRef}
                    className="tag-input"
                    value={value}
                    onChange={handleChange}
                    onKeyDown={onKeyDown}
                    placeholder="enter a value ..."
                    type='number'
                />
                <DropSubmit
                    onClick={onSubmit}
                    icon="mdi mdi-checkbox-marked-outline"
                >
                    save
                </DropSubmit>
            </Row>
        </>
    )
}