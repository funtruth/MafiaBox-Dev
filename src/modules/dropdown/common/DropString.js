import React from 'react'
import { Input } from '../../components/Common';

export default function DropString({
    slate,
    update,
    showDropdown,
}){
    const onSubmit = (value) => {
        update(value)
        showDropdown();
    }

    return (
        <Input
            theme="tag"
            value={typeof slate === 'string' ? slate : ""}
            onSubmit={onSubmit}
            autofocus
            showSubmit
            placeholder="name of patch ..."
            type="text"
            outerprops={{
                sizes: ['z', 'xs']
            }}
        />
    )
}