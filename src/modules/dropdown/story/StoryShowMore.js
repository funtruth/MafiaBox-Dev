import React from 'react'
import { connect } from 'react-redux'

import { modalType } from '../../modal/types'

import { showModal } from '../../modal/ModalReducer'

function StoryShowMore(props) {
    const handleDelete = () => {
        props.showDropdown()
        props.showModal(modalType.deleteStory, {
            boardType: props.boardType,
            mapKey: props.mapKey,
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
            <div className="-sep"/>
            <div className="drop-down-menu-option">
                <i className="drop-down-menu-icon ion-ios-flag"></i>
                Flag
            </div>
            <div className="drop-down-menu-option">
                <i className="drop-down-menu-icon ion-ios-bug"></i>
                Bug Report
            </div>
        </>
    )
}

export default connect(
    null,
    {
        showModal,
    }
)(StoryShowMore)