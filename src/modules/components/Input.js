import React, { useState, useEffect } from 'react';
import './Input.css'
import { useAutofocus } from '../hooks/Hooks';
import Row from './Row';
import { DropSubmit } from '../dropdown/components/Common';

const getClass = (theme) => {
    switch(theme) {
        case 'title':
            return '--input-title'
        case 'tag':
            return '--input-tag'
        default:
            return ''
    }
}

export default function Input(props) {
    const {
        style,
        theme,
        outerprops,
        value,
        onChange,
        onSubmit,
        submitOnBlur,
        showSubmit,
        autofocus,
        type,
        placeholder,
    } = props

    const focusRef = useAutofocus(autofocus)
    const [text, setText] = useState('')
    
    //update text based on initial value / if value changes
    useEffect(() => {
        setText(value || '')
    }, [value])

    //update input
    const handleChange = (e) => {
        if (onChange) {
            onChange(e.target.value);
        }
        setText(e.target.value)
    }

    //blur input if enter is pressed
    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            if (onSubmit) {
                onSubmit(text);
            }
        }
    }

    //update on blur (and unmount)
    const handleBlur = () => {
        if (submitOnBlur) {
            if (onSubmit) {
                onSubmit(text);
            }
        }
    }

    return (
        <Row {...outerprops}>
            <input
                ref={focusRef}
                className={getClass(theme)}
                value={text}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
                placeholder={placeholder}
                type={type}
                style={style}
            />
            {showSubmit && <DropSubmit onClick={() => onSubmit(text)}></DropSubmit>}
        </Row>
    )
}