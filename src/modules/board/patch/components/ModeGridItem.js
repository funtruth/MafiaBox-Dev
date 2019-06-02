import React from 'react'
import { connect } from 'react-redux'
import { SortableElement } from 'react-sortable-hoc';

import { navigateStack } from '../../../app/NavReducer'
import { STOP_DROP_PROP } from '../../../common/arrows';

import {
    DropClick,
    Row,
    Tag,
    Text,
} from '../../../components/Common';

const RoleGridItem = SortableElement((props) => {
    const { modeKey, modeRepo } = props
    const modeInfo = modeRepo[modeKey] || {}
    const { title } = modeInfo
    
    const handleClick = (e) => {
        if (STOP_DROP_PROP(e)) return;
        props.navigateStack('mode/' + modeKey)
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
            <Text color="lightgrey" size="m" align="c" style={{marginRight: 'auto'}}>{title || 'Untitled'}</Text>
            <DropClick>
                <Tag icon="mdi mdi-dots-horizontal"></Tag>
            </DropClick>
        </Row>
    )
})

export default connect(
    state => ({
        modeRepo: state.page.modeRepo,
    }),
    {
        navigateStack,
    }
)(RoleGridItem)