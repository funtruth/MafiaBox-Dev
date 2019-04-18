import React from 'react'

import { modalType } from '../../modal/types'

import DropItem from '../components/DropItem';
import DropTitle from '../components/DropTitle';

export default function PatchItemOptions(props) {
    const { boardType, storyKey } = props

    const handleDelete = () => {
        props.showDropdown()
        props.showModal(modalType.deleteStory, {
            boardType,
            storyKey,
        });
    }

    return (
        <>
            <DropTitle>options</DropTitle>
            <div className="drop-down-menu-option">
                <i className="drop-down-menu-icon ion-ios-git-merge"></i>
                Merge with ...
            </div>
            <DropItem onClick={handleDelete} leftIcon="mdi mdi-trash-can" text="Delete"/>
        </>
    )
}