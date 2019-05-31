import React, { useState } from 'react'
import generatePushID from '../../common/generatePushID';

export default function AddVar(props) {
    let [value, setValue] = useState('')
    
    let handleChange = e => setValue(e.target.value)
    
    let handleConfirm = () => {
        const tagKey = generatePushID('var')
        
        props.updatePage({
            [tagKey]: {
                key: tagKey,
                name: value,
                variableTypes: [],
            },
        })
        props.showDropdown()
    }

    let handleKeyPress = e => {
        switch(e.nativeEvent.key) {
            case 'Enter':
                handleConfirm()
                break
            default:
        }
    }

    return (
        <div>
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
            <div className="drop-down-menu-option" onClick={handleConfirm}>
                <i className="drop-down-menu-icon ion-md-checkbox"></i>
                Create
            </div>
        </div>
    )
}