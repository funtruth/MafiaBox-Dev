import React from 'react'
import { connect } from 'react-redux'

import {
    dropdownType,
    boardType,
} from '../../../common/types';

import {
    addPageToMap,
    addModeToPatch,
} from '../../../page/PageReducer'
import { setPref, PREF_KEY } from '../../../app/AppReducer'

import {
    Body,
    DropClick,
    Row,
    Text,
    Tag,
} from '../../../components/Common';

function PatchHeader(props) {
    const { storyKey, storyRepo, tab, setTab, tabbedData, prefs } = props
    const storyInfo = storyRepo[storyKey] || {}
    const { title } = storyInfo

    const handleAdd = () => {
        if (tab === 0) {
            props.addPageToMap(storyKey, boardType.roles.key)
        } else if (tab === 2) {
            props.addModeToPatch(storyKey)
        }
    }

    const handleTabClick = (index) => {
        setTab(index)

        //save preference for future mount
        const newPref = prefs[PREF_KEY.PATCH_HEADER_TAB] || {}
        newPref[storyKey] = index
        props.setPref(PREF_KEY.PATCH_HEADER_TAB, newPref)   
    }

    const renderTag = (tabIndex, text) => {
        const active = tabIndex === tab
        return (
            <Tag bg={active ? 'violet' : 'charcoal'} onClick={() => handleTabClick(tabIndex)}>
                {`${text} (${tabbedData[tabIndex].length})`}
            </Tag>
        )
    }

    const renderAdd = () => {
        if (tab === 1 || tab === 3) return null;
        return (
            <Tag
                icon="mdi mdi-table-plus"
                onClick={handleAdd}
                style={{
                    marginLeft: 'auto',
                }}
            >
                Add
            </Tag>
        )
    }

    return (
        <Row bg="blackish" color="whitish" y="c" sizes={['xs', 'xl']}>
            <DropClick
                dropdown={dropdownType.dropString}
                params={{
                    path: ['storyRepo', storyKey, 'title'],
                }}
                style={{
                    paddingRight: 10,
                }}
            >
                <Text size="l" color={title ? 'whitish' : 'darkgrey'}>
                    {title || 'Untitled'}
                </Text>
            </DropClick>
            <Body>
                <Text style={{marginLeft: 8}}>Roles</Text>
                <Row>
                    {renderTag(0, 'In Progress')}
                    {renderTag(1, 'Published')}
                </Row>
            </Body>
            <Body>
                <Text style={{marginLeft: 8}}>Game Modes</Text>
                <Row>
                    {renderTag(2, 'In Progress')}
                    {renderTag(3, 'Published')}
                </Row>
            </Body>
            {renderAdd()}
        </Row>
    )
}

export default connect(
    state => ({
        storyRepo: state.page.storyRepo,
        prefs: state.app.prefs,
    }),
    {
        addPageToMap,
        addModeToPatch,
        setPref,
    }
)(PatchHeader)