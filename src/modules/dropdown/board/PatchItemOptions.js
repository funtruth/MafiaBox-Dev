import React from 'react'
import { connect } from 'react-redux'

import { modalType } from '../../modal/types'

import { showModal } from '../../modal/ModalReducer'

import DropItem from '../components/DropItem';
import DropTitle from '../components/DropTitle';

function PatchItemOptions(props) {
    const { boardType, storyKey } = props

    const handleDelete = () => {
        props.showDropdown()
        props.showModal(modalType.deleteStory, {
            boardType,
            storyKey,
        })
    }

    return (
        <>
            <DropTitle>options</DropTitle>
            <div className="drop-down-menu-option">
                <i className="drop-down-menu-icon ion-ios-git-merge"></i>
                Merge with ...
            </div>
            <DropItem onClick={handleDelete} leftIcon="mdi mdi-trash-can">Delete</DropItem>
        </>
    )
}

export default connect(
    null,
    {
        showModal,
    }
)(PatchItemOptions)