import React from 'react'
import { connect } from 'react-redux'

import { dropdownType } from '../../../dropdown/types';
import { boardType } from '../../../fields/defaults';

import {
    addPageToMap,
    addModeToPatch,
} from '../../../page/PageReducer'

import {
    Body,
    DropClick,
    Row,
    Text,
    Tag,
} from '../../../components/Common';

function PatchHeader(props) {
    const { storyKey, storyRepo, tab, setTab } = props
    const storyInfo = storyRepo[storyKey] || {}
    const { title } = storyInfo

    const handleAdd = () => {
        if (tab === 0) {
            props.addPageToMap(storyKey, boardType.roles.key)
        } else if (tab === 1) {
            props.addModeToPatch(storyKey)
        }
    }

    return (
        <Row bg="blackish" color="whitish" y="c" sizes={['s', 'xxl']}>
            <DropClick
                dropdown={dropdownType.editPatchName}
                params={{
                    path: ['storyRepo', storyKey],
                    attach: storyInfo,
                }}
                style={{
                    paddingRight: 10,
                }}
            >
                <Text size="l" color={title ? 'whitish' : 'darkgrey'}>
                    {title || 'Untitled'}
                </Text>
            </DropClick>
            <Body sizes={['z', 's']}>
                <Text style={{marginLeft: 8}}>Roles</Text>
                <Row>
                    <Tag onClick={() => setTab(0)}>In Progress</Tag>
                    <Tag onClick={() => setTab(0)}>Published</Tag>
                </Row>
            </Body>
            <Body sizes={['z', 's']}>
                <Text style={{marginLeft: 8}}>Game Modes</Text>
                <Row>
                    <Tag onClick={() => setTab(1)}>In Progress</Tag>
                    <Tag onClick={() => setTab(1)}>Published</Tag>
                </Row>
            </Body>
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
        storyRepo: state.page.storyRepo,
    }),
    {
        addPageToMap,
        addModeToPatch,
    }
)(PatchHeader)