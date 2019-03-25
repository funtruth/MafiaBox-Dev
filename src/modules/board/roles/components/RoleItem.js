import React from 'react'
import { connect } from 'react-redux'

import { modalType } from '../../../modal/types'

import { showModal } from '../../../modal/ModalReducer'

function RoleItem(props) {
    const { pageKey, pageRepo } = props
    const pageInfo = pageRepo[pageKey] || {}

    const handleClick = () => {
        props.showModal(
            modalType.showPage,
            {
                pageKey,
                path: [pageKey],
                updateSource: updateSourceType.repo,
                boardType,
            },
        )
    }

    return (
        <div>

        </div>
    )
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    }),
    {
        showModal,
    }
)(RoleItem)
