import React, { useState } from 'react'
import { connect } from 'react-redux'

import { genUID } from '../../common/helpers';
import {
    useAutofocus
} from '../../hooks/Hooks';
import { updateField } from '../../page/PageReducer'

import {
    DropSubmit,
} from '../components/Common'

export default connect(
    null,
    {
        updateField,
    }
)(function CreateUniqueTag(props) {
    const { path, attach, placeholder } = props

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
})