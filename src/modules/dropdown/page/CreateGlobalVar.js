import React, { useState } from 'react'
import { connect } from 'react-redux'

import { genUID } from '../../common/helpers';
import {
    useAutofocus
} from '../../hooks/Hooks';
import { updateGeneral } from '../../page/PageReducer'

import {
    DropTitle,
    DropSubmit,
} from '../components/Common'
import { Row } from '../../components/Common';

const KEYWORDS = []

//PickGlobalVar
export default connect(
    state => ({
        globalVars: state.page.globalVars,
    }),
    {
        updateGeneral,
    }
)(function CreateGlobalVar(props) {
    const { globalVars } = props

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

        const newKey = genUID('global', globalVars)
        props.updateGeneral({
            path: ['globalVars', newKey],
            update: {
                key: newKey,
                title: value,
            }
        })
        props.popDropdown();
    }

    return (
        <>
            <DropTitle>create value</DropTitle>
            <Row sizes={['z', 'xs']}>
                <input
                    ref={focusRef}
                    className="tag-input"
                    value={value}
                    onChange={handleChange}
                    onKeyDown={onKeyDown}
                    placeholder="Name your value ..."
                    type='text'
                />
                <DropSubmit onClick={onSubmit}/>
            </Row>
        </>
    )
})