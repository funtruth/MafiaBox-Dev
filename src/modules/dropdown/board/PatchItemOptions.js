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
            <DropItem
                leftIcon="source-merge"
                text="Merge with ..."
            />
            <DropItem onClick={handleDelete} leftIcon="trash-can" text="Delete"/>
        </>
    )
}