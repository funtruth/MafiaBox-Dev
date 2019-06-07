import React from 'react'

 import generatePushID from '../../common/generatePushID';

import { DropTitle } from '../components/Common'
import { Input } from '../../components/Common';

const KEYWORDS = []

//PickGlobalVar
export default function CreateGlobalVar({
    updateGeneral,
    showDropdown,
}){
    const onSubmit = (value) => {
        if (KEYWORDS.includes(value)) {
            return;
        }

        const newKey = generatePushID('global')
        updateGeneral({
            path: ['globalVars', newKey],
            update: {
                key: newKey,
                value,
                display: value,
                title: value,
            }
        })
        showDropdown();
    }

    return (
        <>
            <DropTitle>create value</DropTitle>
            <Input
                theme="tag"
                onSubmit={onSubmit}
                showSubmit
                placeholder="Variable name ..."
                type="text"
                autofocus
                outerprops={{
                    sizes: ['z', 'xs'],
                }}
            />
        </>
    )
}