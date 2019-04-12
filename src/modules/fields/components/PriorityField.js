import React from 'react'
import { connect } from 'react-redux'

import { modalType } from '../../modal/types';

import { showModal } from '../../modal/ModalReducer'
import { sortPriorities } from '../FieldReducer'

import {
    Body,
    Button,
} from '../../components/Common'

const formatNumber = (v) => {
    if (!v)         return '...'
    switch(v) {
        case 1:     return '1st'
        case 2:     return '2nd'
        case 3:     return '3rd'
        default:    return v + 'th'
    }
}

function PriorityField(props) {
    const { fieldKey, value, pageRepo } = props

    let handleClick = () => {
        props.showModal(modalType.editPriority, {
            fieldKey,
            attach: sortPriorities(pageRepo),
        })
    }

    return (
        <Body size="s">
            <Button size="s" onClick={handleClick}>
                {formatNumber(value)}
            </Button>
        </Body>
    )
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    }),
    {
        showModal,
    }
)(PriorityField)