import React from 'react'

import { modalType } from '../../modal/types'

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
            <div className="drop-down-menu-option">
                <i className="drop-down-menu-icon ion-ios-git-merge"></i>
                Merge
            </div>
            <div className="drop-down-menu-option" onClick={handleDelete}>
                <i className="drop-down-menu-icon ion-ios-trash"></i>
                Delete
            </div>
        </>
    )
}