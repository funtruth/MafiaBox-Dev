import React, { useState, useEffect } from 'react';
import './TextArea.css'
import Body from './Body';

export default function TextArea(props) {
    const {
        className           = '',
        style,
        outerprops,
        value,
        onSubmit,
        placeholder,
    } = props

    const [text, setText] = useState(value || '')

    //update text based on initial value / if value changes
    useEffect(() => {
        setText(value)
    }, [value])
    
    //update input
    const handleChange = (e) => {
        setText(e.target.value)
    }

    //blur input if enter pressed
    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {    
            e.target.blur() 
        }
    }

    //update on blur (and unmount)
    const handleBlur = () => {
        onSubmit(text);
    }

    const classes = [
        '--textarea',
        className,
    ].join(" ")

    return (
        <Body {...outerprops}>
            <textarea
                className={classes}
                value={text}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
                placeholder={placeholder}
                type="text"
                style={style}
            />
        </Body>
    )
}