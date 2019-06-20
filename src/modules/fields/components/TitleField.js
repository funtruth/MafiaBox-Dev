import React from 'react'
import Input from '../../components/Input';

export default function TitleField({
    path,
    value,
    updateGeneral,
}){
    const handleTextBlur = (title) => {
        updateGeneral({path, update: title})
    }

    return (
        <Input
            theme="title"
            value={value}
            onSubmit={handleTextBlur}
            submitOnBlur
            placeholder="Untitled"
            type="text"
        />
    )
}