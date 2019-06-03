import React from 'react'

import { modalType } from '../../common/types'

import { DropItem, DropTitle } from '../components/Common'

export default function PickTypeNumber({
    path,
    showModal,
    showDropdown,
}) {
    const onClick = () => {
        showModal(modalType.editNumber, {
            path,
        })
        showDropdown();
    }

    return (
        <>
            <DropTitle>advanced</DropTitle>
            <DropItem
                onClick={onClick}
                leftIcon="mdi mdi-calculator"
                text="equation ..."
            />
        </>
    )
}