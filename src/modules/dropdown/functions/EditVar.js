import React, { useState } from 'react'

import { dropdownType } from '../types'

import DropTitle from '../components/DropTitle'
import DropParent from '../components/DropParent'

export default function EditVar(props) {
    let [value, setValue] = useState(props.currentValue)

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

    let handleChange = e => setValue(e.target.value)

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
            <div className="drop-down-menu-option" onClick={handleSave}>
                <i className="drop-down-menu-icon mdi mdi-ray-start-arrow"></i>
                initialize
            </div>
            <DropTitle>variable assignment</DropTitle>
            <div className="drop-down-menu-option" onClick={handleSave}>
                <i className="drop-down-menu-icon mdi mdi-dots-horizontal"></i>
                advanced ...
            </div>
            <DropTitle>options</DropTitle>
            <div className="drop-down-menu-option" onClick={handleSave}>
                <i className="drop-down-menu-icon ion-ios-save"></i>
                Save
            </div>
            <div className="drop-down-menu-option" onClick={handleDelete}>
                <i className="drop-down-menu-icon ion-ios-trash"></i>
                Delete
            </div>
        </div>
    )
}