import React, { useState } from 'react'

import { opType, opValueType, DEFAULT_ASSIGN } from '../../modal/vars/components/ops';

import DropItem from '../components/DropItem';

export default function SetOpValueTo(props) {
    let [value, setValue] = useState('')

    let handleChange = (e) => setValue(e.target.value)

    let handleSubmit = () => {
        props.updatePage({
            ...DEFAULT_ASSIGN,
            opType: opType.value.key,
            opValueType: opValueType.constant.key,
            value,
        })
        props.showDropdown()
    }

    let handleKeyDown = (e) => {
        switch(e.nativeEvent.key) {
            case 'Enter':
                handleSubmit()
                break
            default:
        }
    }

    return (
        <>
            <input
                className="tag-input"
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Set variable to ..."
                type="number"
                autoFocus
            />
            <div className="-sep"/>
            <DropItem
                onClick={handleSubmit}
                leftIcon="mdi mdi-checkbox-marked"
            >
                save
            </DropItem>
        </>
    )
}