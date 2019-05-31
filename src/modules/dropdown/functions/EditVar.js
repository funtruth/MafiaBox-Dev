import React, { useState } from 'react'

import { dropdownType } from '../types'

import DropTitle from '../components/DropTitle'
import DropParent from '../components/DropParent'
import DropItem from '../components/DropItem'

export default function EditVar(props) {
    let [value, setValue] = useState('')
    let handleChange = e => setValue(e.target.value)

    let handleSave = () => {
        const { currentValue } = props

        if (currentValue === value) {
            return props.showDropdown()
        }

        props.updatePage({
            name: value, 
        })
        props.showDropdown()
    }

    let handleKeyPress = e => {
        switch(e.nativeEvent.key) {
            case 'Enter':
                handleSave()
                break
            default:
        }
    }

    return (
        <>
            <DropTitle>variable declaration</DropTitle>
            <input
                className="tag-input"
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                placeholder="Variable name ..."
                type='text'
                autoFocus
            />
            <div className="-sep"/>
            <DropParent
                dropdown={dropdownType.pickVarType}
                showDropdown={props.showDropdown}
                icon="mdi mdi-language-typescript"
                text="variable type"
            />
            <DropItem
                onClick={handleSave}
                leftIcon="mdi mdi-ray-start-arrow"
                rightIcon="mdi mdi-dots-horizontal adjust-right"
                text="initialize as"
            />
            <DropTitle>options</DropTitle>
            <DropItem onClick={handleSave} leftIcon="mdi mdi-checkbox-marked-outline" text="save variable"/>
        </>
    )
}