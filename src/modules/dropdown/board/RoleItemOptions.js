import React from 'react'

import { modalType } from '../../modal/types'
import { DropItem } from '../components/Common';

export default function RoleItemOptions(props) {
    const { pageKey, attach } = props

    const handleDelete = () => {
        props.showDropdown()
        props.showModal(modalType.deletePage, {
            pageKey,
            attach,
        });
    }

    return (
        <>
            <DropItem
                leftIcon="source-merge"
                text="Merge"
            />
            <DropItem
                leftIcon="trash-can"
                text="Delete"
                onClick={handleDelete}
            />
        </>
    )
}