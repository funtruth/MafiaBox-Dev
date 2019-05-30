import React, { useState } from 'react'

import { genUID } from '../../common/helpers';
import {
    useAutofocus
} from '../../hooks/Hooks';

import {
    DropSubmit,
} from '../components/Common'
import { Row } from '../../components/Common';

export default function CreateUniqueTag(props) {
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
        props.updateGeneral({
            path: ['fieldRepo', ...path, 'data', newKey],
            update: {
                key: newKey,
                title: value,
                index: Object.keys(attach||{}).length,
            }
        })
        props.showDropdown()
    }

    return (
        <Row sizes={['z', 'xs']}>
            <input
                ref={focusRef}
                className="tag-input"
                value={value}
                onChange={handleChange}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                type='text'
            />
            <DropSubmit onClick={onSubmit}/>
        </Row>
    )
}