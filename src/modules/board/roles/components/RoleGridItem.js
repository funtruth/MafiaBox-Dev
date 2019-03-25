import React from 'react'
import { connect } from 'react-redux'
import { SortableElement } from 'react-sortable-hoc';

import { showModal } from '../../../modal/ModalReducer'
import { modalType } from '../../../modal/types';
import { updateSourceType } from '../../../common/types'
import { dropdownType } from '../../../dropdown/types'
import { boardType } from '../../../fields/defaults'

const RoleGridItem = SortableElement((props) => {
    const { pageKey, pageRepo } = props
    const pageInfo = pageRepo[pageKey] || {}
    const { title } = pageInfo
    
    const handleClick = (e) => {
        if (e.target.classList.contains('role-grid-item')) {
            props.showModal(modalType.showPage, {
                pageKey,
                path: [pageKey],
                updateSource: updateSourceType.repo,
                boardType: boardType.roles.key,
            })
        }
    }

    return (
        <div
            className="role-grid-item"
            onClick={handleClick}
        >
            <div className="patch-item-title">
                {title || 'Untitled'}
            </div>
            <div className="patch-item-footer">
                <div
                    className="patch-item-option app-onclick"
                    menu-type={dropdownType.roleItemOptions}
                    app-onclick-props={JSON.stringify({
                        attach: pageInfo,
                        pageKey,
                    })}
                >
                    <i className="mdi mdi-dots-horizontal"></i>
                </div>
            </div>
        </div>
    )
})

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    }),
    {
        showModal,
    }
)(RoleGridItem)