import React, { useState } from 'react'

import { DEFAULT_GAME_CHOICE } from '../../fields/defaults';

import { genUID } from '../../common/helpers';
import {
    useAutofocus,
} from '../../hooks/Hooks'

import {
    DropSubmit,
} from '../components/Common'

const KEYWORDS = []

export default function CreateGameChoice(props) {
    const { attach, placeholder } = props

    const focusRef = useAutofocus()

    const [value, setValue] = useState("")
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
        if (KEYWORDS.includes(value)) {
            return;
        }

        const newKey = genUID('choice', attach)
        props.updatePage({
            ...DEFAULT_GAME_CHOICE,
            key: newKey,
            title: value,
            index: Object.keys(attach||{}).length,
        }, [newKey])
        props.showDropdown()
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
                create
            </DropSubmit>
        </div>
    )
}