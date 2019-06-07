import React, { useState, useEffect } from 'react';
import './Input.css'
import { useAutofocus } from '../hooks/Hooks';
import Body from './Body';

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
        onSubmit,
        submitOnBlur,
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
        setText(e.target.value)
    }

    //blur input if enter is pressed
    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {    
            onSubmit(text);
        }
    }

    //update on blur (and unmount)
    const handleBlur = () => {
        if (submitOnBlur) {
            onSubmit(text);
        }
    }

    return (
        <Body {...outerprops}>
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
        </Body>
    )
}