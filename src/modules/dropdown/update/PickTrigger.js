import React from 'react'

import { modalType } from '../../common/types';

import {
    DropItem,
    DropTitle,
} from '../components/Common'

export default function PickTrigger(props) {
    const { path, subpath } = props

    const handleClick = () => {
        props.showModal(modalType.editTrigger, {
            path,
            subpath,
        })
        props.showDropdown()
    }

    return (
        <>
            <DropTitle>options</DropTitle>
            <DropItem
                onClick={handleClick}
                leftIcon="mdi mdi-flag"
                text="advanced"
            />
        </>
    )
}