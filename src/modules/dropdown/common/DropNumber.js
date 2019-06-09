import React from 'react'

import { Input } from '../../components/Common';

export default function DropNumber({
    update,
    showDropdown,
}) {
    const onSubmit = (value) => {
        update(value)
        showDropdown();
    }

    return (
        <Input
            autofocus
            theme="tag"
            onSubmit={onSubmit}
            showSubmit
            placeholder="enter a number ..."
            type="number"
            outerprops={{
                sizes: ['z', 'xs'],
            }}
        />
    )
}