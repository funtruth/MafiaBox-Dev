import React from 'react'

import {
    dropdownType,
    boardType,
} from '../../../../common/types'

import {
    DropClick,
    Row,
    Tag,
    Text,
} from '../../../../components/Common';

function RolePickerHeader(props) {
    const { modeKey, draftInfo, tab, setTab } = props
    const { key: setupKey, title } = draftInfo
    
    return (
        <Row bg="blackish" color="whitish" size="s" y="c">
            <DropClick
                dropdown={dropdownType.editTitle}
                params={{
                    path: ['modeRepo', modeKey, 'roleSetup', setupKey],
                    attach: draftInfo,
                }}
                style={{
                    paddingRight: 10,
                }}
            >
                <Text color={title ? 'whitish' : 'grey'}>
                    {title || 'Untitled'}
                </Text>
            </DropClick>
            <Tag
                bg={tab === 0 ? 'violet' : 'charcoal'}
                onClick={() => setTab(0)}
                icon="mdi mdi-sitemap"
            >
                Phases
            </Tag>
        </Row>
    )
}

export default RolePickerHeader