import React from 'react'

import generatePushID from '../../common/generatePushID';

import { Row, Input } from '../../components/Common';
import { DropSubmit } from '../components/Common'

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
        <Row sizes={['z', 'xs']}>
            <Input
                theme="tag"
                autofocus
                onSubmit={onSubmit}
                placeholder={placeholder}
                type="text"
            />
            <DropSubmit onClick={onSubmit}/>
        </Row>
    )
}