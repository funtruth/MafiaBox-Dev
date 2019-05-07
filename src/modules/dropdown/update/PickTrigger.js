import React from 'react'

import { modalType } from '../../common/types';
import { DEFAULT_LOGIC } from '../../common/defaults'

import {
    DropItem,
    DropTitle,
} from '../components/Common'

export default function PickTrigger(props) {
    const { attach, subfieldKey } = props

    const handleClick = () => {
        props.showModal(modalType.editTrigger, {
            attach: Object.assign({}, DEFAULT_LOGIC, attach[subfieldKey]),
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