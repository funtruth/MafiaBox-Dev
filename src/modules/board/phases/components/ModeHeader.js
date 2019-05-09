import React from 'react'
import { connect } from 'react-redux'

import {
    dropdownType,
    boardType,
} from '../../../common/types'

import {
    addPageToMode,
} from '../../../page/PageReducer'

import {
    DropClick,
    Row,
    Tag,
    Text,
} from '../../../components/Common';

function ModeHeader(props) {
    const { modeKey, modeRepo, tab, setTab } = props

    const modeInfo = modeRepo[modeKey] || {}
    const { title, playerNum } = modeInfo
    const { min, max } = playerNum || {}

    const handleAdd = () => {
        props.addPageToMode(modeKey, boardType.phases.key)
    }

    return (
        <Row className="--slide-bottom" bg="blackish" color="whitish" size="s" y="c">
            <DropClick
                dropdown={dropdownType.editTitle}
                params={{
                    path: ['modeRepo', modeKey],
                    attach: modeInfo,
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
            <DropClick
                dropdown={dropdownType.editPlayerNum}
                params={{
                    path: ['modeRepo', modeKey, 'playerNum'],
                    attach: modeInfo.playerNum||{},
                }}
            >
                <Tag
                    bg="charcoal"
                    icon="mdi mdi-account-multiple"
                >
                    {`${min||'x'}-${max||'x'} Players`}
                </Tag>
            </DropClick>
            <Tag
                bg={tab === 1 ? 'violet' : 'charcoal'}
                onClick={() => setTab(1)}
                icon="mdi mdi-clipboard-account-outline"
            >
                Role setup
            </Tag>
            <Tag
                icon="mdi mdi-table-plus"
                onClick={handleAdd}
                style={{
                    marginLeft: 'auto',
                }}
            >
                Add
            </Tag>
        </Row>
    )
}

export default connect(
    state => ({
        modeRepo: state.page.modeRepo,
    }),
    {
        addPageToMode,
    }
)(ModeHeader)