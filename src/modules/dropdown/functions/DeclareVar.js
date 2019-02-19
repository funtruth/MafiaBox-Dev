import React, { useState } from 'react'

import { dropdownType } from '../types'

import DropTitle from '../components/DropTitle'
import DropParent from '../components/DropParent'
import DropItem from '../components/DropItem'

export default function DeclareVar(props) {
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

    let handleDelete = () => {
        props.updatePage({
            name: '',
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
        <div>
            <DropTitle>variable declaration</DropTitle>
            <input
                className="tag-input"
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                placeholder="Untitled"
                type='text'
                autoFocus
            />
            <div className="-sep"/>
            <DropParent
                {...props}
                dropdownType={dropdownType.pickVarType}
                icon="mdi mdi-language-typescript"
                text="variable type"
            />
            <DropItem
                leftIcon="mdi mdi-ray-start-arrow"
                rightIcon="mdi mdi-dots-horizontal adjust-right"
                onClick={handleSave}
            >
                initialize as
            </DropItem>
            <DropTitle>options</DropTitle>
            <DropItem
                leftIcon="mdi mdi-checkbox-marked-outline"
                onClick={handleSave}
            >
                add variable
            </DropItem>
        </div>
    )
}