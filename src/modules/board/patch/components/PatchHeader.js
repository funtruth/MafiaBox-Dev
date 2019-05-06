import React from 'react'
import { connect } from 'react-redux'

import { dropdownType } from '../../../dropdown/types';

import {
    addPageToMap,
} from '../../../page/PageReducer'

import {
    DropClick,
    Row,
    Text,
} from '../../../components/Common';

function PatchHeader(props) {
    const { storyKey, storyRepo } = props
    const storyInfo = storyRepo[storyKey] || {}
    const { title } = storyInfo

    return (
        <Row bg="blackish" color="whitish" size="s" y="c">
            <DropClick
                dropdown={dropdownType.editPatchName}
                params={{
                    path: ['storyRepo', storyKey],
                    attach: storyInfo,
                }}
                style={{
                    marginRight: 'auto',
                }}
            >
                <Text color={title ? 'whitish' : 'grey'}>
                    {title || 'Untitled'}
                </Text>
            </DropClick>
        </Row>
    )
}

export default connect(
    state => ({
        storyRepo: state.page.storyRepo,
    }),
    {
        addPageToMap,
    }
)(PatchHeader)