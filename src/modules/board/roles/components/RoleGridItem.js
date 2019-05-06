import React from 'react'
import { connect } from 'react-redux'
import { SortableElement } from 'react-sortable-hoc';

import { showModal } from '../../../modal/ModalReducer'
import { modalType } from '../../../modal/types';
import { updateSourceType } from '../../../common/types'
import { dropdownType } from '../../../dropdown/types'
import { boardType } from '../../../fields/defaults'

import { DropClick } from '../../../components/Common';
import { STOP_DROP_PROP } from '../../../common/arrows';

const RoleGridItem = SortableElement((props) => {
    const { pageKey, pageRepo } = props
    const pageInfo = pageRepo[pageKey] || {}
    const { title } = pageInfo
    
    const handleClick = (e) => {
        if (STOP_DROP_PROP(e)) return;
        props.showModal(modalType.showPage, {
            pageKey,
            path: [pageKey],
            updateSource: updateSourceType.repo,
            boardType: boardType.roles.key,
        })
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
                <DropClick
                    className="patch-item-option"
                    dropdown={dropdownType.roleItemOptions}
                    params={{
                        attach: pageInfo,
                        pageKey,
                    }}
                >
                    <i className="mdi mdi-dots-horizontal"></i>
                </DropClick>
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