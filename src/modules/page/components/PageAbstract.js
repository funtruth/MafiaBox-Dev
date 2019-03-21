import React, { useState } from 'react'

export default function PageAbstract(props) {
    const { path, pageInfo } = props

    const [title, setTitle] = useState(pageInfo.title)

    const handleChange = e => {
        setTitle(e.target.value)
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {    
            e.target.blur() 
        }
    }

    const handleTextBlur = () => {
        props.updatePage([...path, 'title'], title)
    }

    return (
        <input
            className="page-title-input"
            value={title}
            onChange={handleChange}
            onBlur={handleTextBlur}
            onKeyPress={handleKeyPress}
            placeholder="Untitled"
            type="text"
            autoFocus={true}
        />
    )
}