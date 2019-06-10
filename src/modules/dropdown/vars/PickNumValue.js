import React from 'react'

import {
    parseType,
    variableType,
} from '../../common/types'
import { LOGIC_ITEM_VAR } from '../../common/defaults';

 import generatePushID from '../../common/generatePushID';

import { DropTitle } from '../components/Common'
import { Input } from '../../components/Common'

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
    //changing value @ byId.[mathKey].value
    const updateSlate = (value) => {
        update({
            ...LOGIC_ITEM_VAR,
            display: value,
            parseBy: parseType.constant,
            value,
            variableTypes: [variableType.number.key],
        })
        showDropdown();
    }

    //setting value to an empty ValueDrop @ byId
    const setSlate = (value) => {
        const newKey = generatePushID('math')
        
        update({
            [item.key]: {
                ...item,
                value: {
                    ...item.value,
                    [side]: newKey,
                },
            },
            [newKey]: {
                ...LOGIC_ITEM_VAR,
                key: newKey,
                display: value,
                value,
                parseBy: parseType.constant,
                variableTypes: [variableType.number.key],
            },
        })
        showDropdown();
    }

    const onSubmit = (value) => {
        if (!mathKey) {
            setSlate(value);
        } else {
            updateSlate(value);
        }
        showDropdown();
    }
    
    return (
        <>
            <DropTitle>set to number</DropTitle>
            <Input
                autofocus
                theme="tag"
                value={mathKey && typeof slate === 'number' ? slate : ""}
                onSubmit={onSubmit}
                showSubmit
                placeholder="enter a value ..."
                type='number'
                outerprops={{
                    sizes: ['z', 'xs'],
                }}
            />
        </>
    )
}