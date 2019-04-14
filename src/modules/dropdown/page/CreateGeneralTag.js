import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'

import { genUID } from '../../common/helpers';
import { updateField } from '../../page/PageReducer'

import {
    DropSubmit,
} from '../components/Common'

export default connect(
    null,
    {
        updateField,
    }
)(function CreateGeneralTag(props) {
    const { path, attach, placeholder } = props

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
        const newKey = genUID('team', attach)
        props.updateField([...path, 'data', newKey], {
            key: newKey,
            title: value,
            index: Object.keys(attach||{}).length,
        })
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
})