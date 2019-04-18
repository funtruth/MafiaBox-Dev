import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'

import { genUID } from '../../common/helpers';
import { updateGlobal } from '../../page/PageReducer'

import {
    DropSubmit,
} from '../components/Common'

const KEYWORDS = []

export default connect(
    state => ({
        globalVars: state.page.globalVars,
    }),
    {
        updateGlobal,
    }
)(function CreateGlobalVar(props) {
    const { path, globalVars, placeholder } = props

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

        const newKey = genUID('global', globalVars)
        props.updateGlobal([...path, 'data', newKey], {
            key: newKey,
            title: value,
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