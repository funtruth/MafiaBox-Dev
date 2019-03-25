import React from 'react'
import { connect } from 'react-redux'

import { modalType } from '../../modal/types'

import { showModal } from '../../modal/ModalReducer'

function RoleItemOptions(props) {
    const { boardType, storyKey } = props

    const handleDelete = () => {
        props.showDropdown()
        props.showModal(modalType.deletePage, {
            boardType,
            storyKey,
        })
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

export default connect(
    null,
    {
        showModal,
    }
)(RoleItemOptions)