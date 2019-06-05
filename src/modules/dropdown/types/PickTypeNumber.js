import React from 'react'

import { modalType, dropdownType } from '../../common/types'

import { DropItem, DropTitle, DropParent } from '../components/Common'

export default function PickTypeNumber({
    path,
    showModal,
    showDropdown,
}) {
    const onEquation = () => {
        showModal(modalType.editNumber, {path})
        showDropdown();
    }

    return (
        <>
            <DropTitle>advanced</DropTitle>
            <DropParent
                dropdown={dropdownType.varItemConstant}
                params={{
                    path,
                }}
                icon="alpha-c-circle"
                text="set to ..."
                showDropdown={showDropdown}
            />
            <DropItem
                onClick={onEquation}
                leftIcon="calculator"
                text="equation ..."
            />
        </>
    )
}