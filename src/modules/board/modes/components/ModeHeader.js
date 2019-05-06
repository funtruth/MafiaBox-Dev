import React from 'react'
import { connect } from 'react-redux'

import { boardType } from '../../../fields/defaults'
import { dropdownType } from '../../../dropdown/types';

import {
    updateStory,
    addPageToMap,
} from '../../../page/PageReducer'

import {
    DropClick,
    Row,
    Tag,
    Text,
} from '../../../components/Common';

function RoleHeader(props) {
    const { storyKey, storyRepo } = props
    const storyInfo = storyRepo[storyKey] || {}
    const { title } = storyInfo

    const handleAdd = () => {
        props.addPageToMap(storyKey, boardType.roles.key)
    }

    return (
        <Row bg="blackish" color="whitish" size="s" y="c">
            <DropClick
                dropdown={dropdownType.editPatchName}
                params={{
                    storyKey,
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
        storyRepo: state.page.storyRepo,
    }),
    {
        updateStory,
        addPageToMap,
    }
)(RoleHeader)