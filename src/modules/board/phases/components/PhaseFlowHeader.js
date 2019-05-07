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

function PhaseFlowHeader(props) {
    const { modeKey, modeRepo } = props
    const modeInfo = modeRepo[modeKey] || {}
    const { title } = modeInfo

    const handleAdd = () => {
        props.addPageToMode(modeKey, boardType.phases.key)
    }

    return (
        <Row bg="blackish" color="whitish" size="s" y="c">
            <DropClick
                dropdown={dropdownType.editPatchName}
                params={{
                    path: ['modeRepo', modeKey],
                    attach: modeInfo,
                }}
                style={{
                    marginRight: 'auto',
                }}
            >
                <Text color={title ? 'whitish' : 'grey'}>
                    {title || 'Untitled'}
                </Text>
            </DropClick>
            <Tag
                icon="mdi mdi-table-plus"
                onClick={handleAdd}
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
)(PhaseFlowHeader)