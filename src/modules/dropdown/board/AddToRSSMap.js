import React from 'react'

import generatePushID from '../../common/generatePushID';

import { Input } from '../../components/Common';
import { concatField } from '../../logic/proptool';
import { LOGIC_ITEM_VAR } from '../../logic/defaults';

export default function AddToRSSMap({
    prefix,//passed
    updateGeneral,
    showDropdown,
}){
    const onSubmit = (value) => {
        if (!value) return;

        const newKey = generatePushID('rss')
        updateGeneral({
            path: ['rssMap', newKey],
            update: {
                ...LOGIC_ITEM_VAR,
                key: newKey,
                value: concatField(prefix, value),
                display: value,
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
            placeholder="name of field ..."
            outerprops={{sizes: ['z', 'xs']}}
            type="text"
        />
    )
}