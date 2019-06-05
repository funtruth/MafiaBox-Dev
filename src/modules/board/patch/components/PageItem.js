import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SortableElement } from 'react-sortable-hoc';

import {
    boardType,
    dropdownType,
    modalType,
} from '../../../common/types';

import { showModal } from '../../../modal/ModalReducer'
import { STOP_DROP_PROP } from '../../../common/arrows';

import {
    DropClick,
    Row,
    Tag,
    Text,
} from '../../../components/Common';
import { navigateStack } from '../../../app/NavReducer';

export default SortableElement(({pageKey, board}) => {
    const dispatch = useDispatch();
    const pageRepo = useSelector(state => state.page.pageRepo);

    const pageInfo = pageRepo[pageKey] || {}
    const { title } = pageInfo
    
    const handleClick = (e) => {
        if (STOP_DROP_PROP(e)) return;

        switch(board) {
            case boardType.modes.key:
                dispatch(navigateStack(pageKey))
                break;
            case boardType.events.key:
            case boardType.phases.key:
            case boardType.roles.key:
            default:
                dispatch(showModal(modalType.showPage, {
                    pageKey,
                    path: ['pageRepo', pageKey],
                }))
        }
    }

    return (
        <Row
            className="--slide-bottom"
            sizes={['xxs', 'xxl']}
            bg="charcoal"
            y="c"
            onClick={handleClick}
            style={{
                border: '1px solid #333',
                borderRadius: 4,
            }}
        >
            <Text color="lightgrey" size="s" align="c" style={{marginRight: 'auto'}}>
                {title || 'Untitled'}
            </Text>
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