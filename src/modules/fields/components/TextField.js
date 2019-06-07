import React from 'react'
import { TextArea } from '../../components/Common';

export default function TextField({ path, value, updateGeneral }) {
    const handleTextBlur = (text) => {
        updateGeneral({path, update: text})
    }

    return (
        <TextArea
            value={value}
            onSubmit={handleTextBlur}
            placeholder="Start typing ..."
            type="text"
        />
    )
}