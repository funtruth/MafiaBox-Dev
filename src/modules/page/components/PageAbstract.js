import React, { useState, useEffect } from 'react'

export default function PageAbstract({
    slate,
    update,
}){
    const [title, setTitle] = useState(slate.title)
    useEffect(() => {
        setTitle(slate.title)
    }, [slate.title])

    const handleChange = e => {
        setTitle(e.target.value)
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {    
            e.target.blur() 
        }
    }

    const handleTextBlur = () => {
        update({title})
    }

    return (
        <input
            className="page-title-input"
            value={title || ""}
            onChange={handleChange}
            onBlur={handleTextBlur}
            onKeyPress={handleKeyPress}
            placeholder="Untitled"
            type="text"
            autoFocus={true}
        />
    )
}