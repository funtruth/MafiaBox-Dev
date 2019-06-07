import React from 'react'
import Input from '../../components/Input';

export default function PageAbstract({
    slate,
    update,
}){
    const handleTextBlur = (title) => {
        update({title})
    }

    return (
        <Input
            theme="title"
            value={slate.title}
            onSubmit={handleTextBlur}
            placeholder="Untitled"
            type="text"
        />
    )
}