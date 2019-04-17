import React, { useState, useEffect, useRef } from 'react'

import { DEFAULT_GAME_CHOICE } from '../../fields/defaults';

import { genUID } from '../../common/helpers';

import {
    DropSubmit,
} from '../components/Common'

const KEYWORDS = []

export default function CreateGameChoice(props) {
    const { attach, placeholder } = props

    //workaround, animating dropdown conflicts with autoFocus on mount
    const autofocus = useRef(null)
    useEffect(() => {
        const timer = setTimeout(() => {autofocus.current.focus()}, 100);
        return () => clearTimeout(timer)
    }, [autofocus])

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
                create
            </DropSubmit>
        </div>
    )
}