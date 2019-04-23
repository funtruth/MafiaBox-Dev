import React, { useState } from 'react'

import {
    useAutofocus
} from '../../hooks/Hooks'

import {
    DropSubmit,
} from '../components/Common'

const KEYWORDS = []

export default function WriteGameChoice(props) {
    const { currentValue, placeholder } = props

    const focusRef = useAutofocus()
    
    const [value, setValue] = useState(currentValue)
    const handleChange = e => setValue(e.target.value)

    const onKeyDown = e => {
        switch(e.nativeEvent.key) {
            case 'Enter':
                onSubmit()
                break
            default:
        }
    }

    const onSubmit = () => {
        if (!value) {
            return;
        }

        if (KEYWORDS.includes(value)) {
            return;
        }

        props.updatePage(value)
        props.showDropdown();
    }

    return (
        <div className="row">
            <input
                ref={focusRef}
                className="tag-input"
                value={value}
                onChange={handleChange}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                type='text'
            />
            <DropSubmit
                onClick={onSubmit}
                icon="mdi mdi-checkbox-marked-outline"
            >
                save
            </DropSubmit>
        </div>
    )
}