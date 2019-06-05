import React, { useState } from 'react'

import {
    useAutofocus,
} from '../../hooks/Hooks'

import { DropSubmit } from '../components/Common'
import { Row } from '../../components/Common';

/*
accessed from:
    EditEvent
required params:
    path -> update path of PageReducer
*/
export default function DropString({
    slate,
    update,
    showDropdown,
}){
    const focusRef = useAutofocus()

    const [value, setValue] = useState(typeof slate === 'string' ? slate : "")
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
        update(value)
        showDropdown();
    }

    return (
        <Row sizes={['z', 'xs']}>
            <input
                ref={focusRef}
                className="tag-input"
                value={value}
                onChange={handleChange}
                onKeyDown={onKeyDown}
                placeholder="name of patch ..."
                type='text'
            />
            <DropSubmit onClick={onSubmit}/>
        </Row>
    )
}