import React, { useState } from 'react'
import { TextArea } from '../../components/Common';

export default function TextField(props) {
    const { path } = props
    
    const [value, setValue] = useState(props.value || "")
    const handleChange = e => setValue(e.target.value)
    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {    
            e.target.blur() 
        }
    }
    const handleTextBlur = () => {
        props.updatePage(path, value)
    }

    return (
        <TextArea
            value={value}
            handleChange={handleChange}
            handleBlur={handleTextBlur}
            handleKeyPress={handleKeyPress}
            placeholder="Start typing ..."
            type="text"
        />
    )
}