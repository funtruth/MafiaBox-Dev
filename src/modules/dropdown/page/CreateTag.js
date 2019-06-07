import React from 'react'

import generatePushID from '../../common/generatePushID';

import { Input } from '../../components/Common';

export default function CreateUniqueTag({
    slate,
    path,
    placeholder,
    updateGeneral,
    showDropdown,
}){
    const onSubmit = (value) => {
        if (!value) return;

        const newKey = generatePushID('team')
        updateGeneral({
            path: [...path, 'data', newKey],
            update: {
                key: newKey,
                title: value,
                index: Object.keys(slate.data||{}).length,
            }
        })
        showDropdown();
    }

    return (
        <Input
            theme="tag"
            autofocus
            onSubmit={onSubmit}
            showSubmit
            placeholder={placeholder}
            outerprops={{sizes: ['z', 'xs']}}
            type="text"
        />
    )
}