import React, { useState, useEffect } from 'react';
import './Input.css'
import Body from './Body';

const getClass = (theme) => {
    switch(theme) {
        case 'title':
            return '--input-title'
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
        type,
        placeholder,
    } = props

    const [text, setText] = useState('')
    
    //update text based on initial value / if value changes
    useEffect(() => {
        setText(value)
    }, [value])

    //update input
    const handleChange = (e) => {
        setText(e.target.value)
    }

    //blur input if enter is pressed
    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {    
            e.target.blur() 
        }
    }

    //update on blur (and unmount)
    const handleBlur = () => {
        onSubmit(text);
    }

    return (
        <Body {...outerprops}>
            <input
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