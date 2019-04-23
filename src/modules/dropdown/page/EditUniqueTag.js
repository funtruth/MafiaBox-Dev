import React from 'react'
import { connect } from 'react-redux'

import { updateField } from '../../page/PageReducer'

import {
    DropItem,
    DropTitle,
} from '../components/Common'

export default connect(
    null,
    {
        updateField,
    }
)(function EditUniqueTag(props) {
    const { subfieldKey, defaultValue, path } = props

    const onDelete = () => {
        props.updateField([...path, 'data', subfieldKey], '')
        props.showDropdown();
    }

    const onDefault = () => {
        props.updateField([...path, 'defaultValue'], subfieldKey)
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
})