import React, { useState } from 'react'

import { dropdownType } from '../types'

import DropTitle from '../components/DropTitle'

export default function AssignVar(props) {
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
        <>
            <DropTitle>variable assignment</DropTitle>
            <div className="drop-down-menu-option" onClick={handleSave}>
                <i className="drop-down-menu-icon mdi mdi-variable"></i>
                variable
            </div>
            <div className="drop-down-menu-option" onClick={handleSave}>
                <i className="drop-down-menu-icon mdi mdi-ray-start-arrow"></i>
                assign as
                <i className="mdi mdi-dots-horizontal adjust-right"/>
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
        </>
    )
}