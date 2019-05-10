import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import {
    modalType,
    boardType,
} from '../../common/types';

import { showModal } from '../../modal/ModalReducer'

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
        const sortedPriorities = _(pageRepo)
            .filter(i => i && i.boardType === boardType.roles.key)
            .groupBy(i => i.priority)
            .sortBy((i, k) => k)
            .value()

        props.showModal(modalType.editPriority, {
            fieldKey,
            attach: sortedPriorities,
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