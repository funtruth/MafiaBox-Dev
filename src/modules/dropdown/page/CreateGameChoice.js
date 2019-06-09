import React from 'react'

import { DEFAULT_GAME_CHOICE } from '../../fields/defaults';

import generatePushID from '../../common/generatePushID';

import { Input } from '../../components/Common';

const KEYWORDS = [];

export default function CreateGameChoice({
    slate,
    path,
    updateGeneral,
    showDropdown,
}) {
    const onSubmit = (value) => {
        if (KEYWORDS.includes(value)) {
            return;
        }

        const newKey = generatePushID('choice')
        updateGeneral({
            path: [...path, newKey],
            update: {
                ...DEFAULT_GAME_CHOICE,
                key: newKey,
                title: value,
                index: Object.keys(slate).length,
            }
        })
        showDropdown();
    }

    return (
        <Input
            autofocus
            theme="tag"
            onSubmit={onSubmit}
            showSubmit
            placeholder="name of choice ..."
            type="text"
            outerprops={{
                sizes: ['z', 'xs'],
            }}
        />
    )
}