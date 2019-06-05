import React from 'react'

import {
    DropItem,
    DropTitle,
} from '../components/Common'

export default function EditUniqueTag(props) {
    const { subfieldKey, defaultValue, path } = props

    const onDelete = () => {
        props.updateGeneral({
            path: ['fieldRepo', ...path, 'data', subfieldKey],
            update: '',
        })
        props.showDropdown();
    }

    const onDefault = () => {
        props.updateGeneral({
            path: ['fieldRepo', ...path, 'defaultValue'],
            update: subfieldKey,
        })
        props.showDropdown();
    }

    return (
        <>
            <DropTitle>options</DropTitle>
            <DropItem
                chosen={defaultValue === subfieldKey}
                onClick={onDefault}
                leftIcon="settings-box"
                rightCheck
                text="set as default"
            />
            <DropItem
                onClick={onDelete}
                leftIcon="trash-can"
                text="delete"
            />
        </>
    )
}