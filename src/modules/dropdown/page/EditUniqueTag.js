import React from 'react'

import {
    DropItem,
    DropTitle,
} from '../components/Common'

export default function EditUniqueTag(props) {
    const { subfieldKey, defaultValue, path } = props

    const onDelete = () => {
        props.updateGeneral(['fieldRepo', ...path, 'data', subfieldKey], '')
        props.showDropdown();
    }

    const onDefault = () => {
        props.updateGeneral(['fieldRepo', ...path, 'defaultValue'], subfieldKey)
        props.showDropdown();
    }

    return (
        <>
            <DropTitle>options</DropTitle>
            <DropItem
                chosen={defaultValue === subfieldKey}
                onClick={onDefault}
                leftIcon="mdi mdi-settings-box"
                rightCheck
                text="set as default"
            />
            <DropItem
                onClick={onDelete}
                leftIcon="mdi mdi-trash-can"
                text="delete"
            />
        </>
    )
}