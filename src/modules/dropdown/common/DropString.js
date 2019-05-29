import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import {
    useAutofocus, usePath,
} from '../../hooks/Hooks'
import { updateGeneral } from '../../page/PageReducer'
import { showDropdown } from '../DropdownReducer'

import {
    DropSubmit,
} from '../components/Common'

/*
accessed from:
    EditEvent
required params:
    path -> update path of PageReducer
*/
export default function DropString({path}) {
    const dispatch = useDispatch();

    if (!path) {
        console.warn('missing a required param.')
        return null
    }

    const slate = usePath(path, "")

    const focusRef = useAutofocus()

    const [value, setValue] = useState(slate || "")
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
        dispatch(updateGeneral(path, value))
        dispatch(showDropdown());
    }

    return (
        <div className="row">
            <input
                ref={focusRef}
                className="tag-input"
                value={value}
                onChange={handleChange}
                onKeyDown={onKeyDown}
                placeholder="name of patch ..."
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