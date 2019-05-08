import React from 'react'
import { connect } from 'react-redux'
import { SortableElement } from 'react-sortable-hoc';


import {
    boardType,
    dropdownType,
    modalType,
    updateSourceType
} from '../../../common/types';

import { showModal } from '../../../modal/ModalReducer'
import { STOP_DROP_PROP } from '../../../common/arrows';

import {
    DropClick,
    Row,
    Tag,
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
        <Row
            sizes={['xxs', 'xxl']}
            bg="charcoal"
            y="c"
            onClick={handleClick}
            style={{
                border: '1px solid #333',
                borderRadius: 4,
            }}
        >
            <Text color="lightgrey" size="s" align="c" style={{marginRight: 'auto'}}>{title || 'Untitled'}</Text>
            <DropClick
                dropdown={dropdownType.roleItemOptions}
                params={{
                    attach: pageInfo,
                    pageKey,
                }}
                style={{
                    borderRadius: 8,    
                }}
            >
                <Tag icon="mdi mdi-dots-horizontal"></Tag>
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