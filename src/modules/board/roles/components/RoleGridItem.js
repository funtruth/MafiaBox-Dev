import React from 'react'
import { connect } from 'react-redux'
import { SortableElement } from 'react-sortable-hoc';


import { modalType } from '../../../modal/types';
import { updateSourceType } from '../../../common/types'
import { dropdownType } from '../../../dropdown/types'
import { boardType } from '../../../fields/defaults'

import { showModal } from '../../../modal/ModalReducer'
import { STOP_DROP_PROP } from '../../../common/arrows';

import {
    DropClick,
    Row,
    Text,
} from '../../../components/Common';

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
        <Row sizes={['xs', 'xxl']} bg="charcoal" y="c" onClick={handleClick} style={{border: '1px solid #333'}}>
            <Text color="lightgrey" size="m" align="c" style={{marginRight: 'auto'}}>{title || 'Untitled'}</Text>
            <DropClick
                className="patch-item-option"
                dropdown={dropdownType.roleItemOptions}
                params={{
                    attach: pageInfo,
                    pageKey,
                }}
                style={{
                    borderRadius: 8,    
                }}
            >
                <i className="mdi mdi-dots-horizontal"></i>
            </DropClick>
        </Row>
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