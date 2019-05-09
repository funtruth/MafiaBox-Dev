import React, { useEffect } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import {
    boardType,
    dropdownType,
} from '../../../../common/types'

import { countRoles } from '../../helpers'

import {
    DropClick,
    Row,
    Tag,
    Text,
} from '../../../../components/Common';

function RolePickerHeader(props) {
    const { modeKey, draftInfo, pageRepo, storyRepo,
        tab, setTab, setResults } = props
    const { key: setupKey, title, players, roles } = draftInfo

    useEffect(() => {
        refresh(tab)
    }, [tab])

    const refresh = (tabIndex) => {
        switch(tabIndex) {
            case 1:
                setResults(
                    _(pageRepo)
                        .filter(i => i.boardType === boardType.roles.key)
                        .groupBy(i => i.storyType)
                        .map((item, key) => ({
                            key,
                            title: (storyRepo[key] && storyRepo[key].title) || key,
                            data: item,
                        }))
                        .value()
                )
                break
            default:
        }
    }
    
    const onTabClick = (index) => {
        
        setTab(index)
    }

    return (
        <Row
            bg="blackish" color="whitish"
            sizes={['xxs', 'xl']} y="c"
        >
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
                <Text size="s" color={title ? 'whitish' : 'grey'}>
                    {title || 'Untitled'}
                </Text>
            </DropClick>
            <Tag
                bg={tab === 0 ? 'violet' : 'charcoal'}
                onClick={() => onTabClick(0)}
                icon="mdi mdi-inbox"
            >
                {`Selected (${countRoles(roles)}/${players})`}
            </Tag>
            <Tag
                bg={tab === 1 ? 'violet' : 'charcoal'}
                onClick={() => onTabClick(1)}
                icon="mdi mdi-library"
            >
                View All
            </Tag>
        </Row>
    )
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
        storyRepo: state.page.storyRepo,
    })
)(RolePickerHeader)