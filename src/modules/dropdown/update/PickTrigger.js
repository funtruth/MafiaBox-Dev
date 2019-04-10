import React from 'react'
import { connect } from 'react-redux'

import { modalType } from '../../modal/types';
import { DEFAULT_LOGIC } from '../../logic/types'

import { showModal } from '../../modal/ModalReducer'

import {
    DropItem,
    DropTitle,
} from '../components/Common'

function PickTrigger(props) {
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
            >
                advanced ...
            </DropItem>
        </>
    )
}

export default connect(
    null,
    {
        showModal,
    }
)(PickTrigger)