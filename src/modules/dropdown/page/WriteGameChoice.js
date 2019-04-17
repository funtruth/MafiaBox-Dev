import React, { useState, useEffect, useRef } from 'react'

import {
    DropSubmit,
} from '../components/Common'

const KEYWORDS = []

export default function WriteGameChoice(props) {
    const { currentValue, placeholder } = props

    //workaround, animating dropdown conflicts with autoFocus on mount
    const autofocus = useRef(null)
    useEffect(() => {
        const timer = setTimeout(() => {autofocus.current.focus()}, 100);
        return () => clearTimeout(timer)
    }, [autofocus])

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
                ref={autofocus}
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