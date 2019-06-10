import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { dropdownType } from '../../../common/types';

import { addPageToMap } from '../../../page/PageReducer'
import { setPref, PREF_KEY } from '../../../app/AppReducer'

import {
    DropClick,
    Row,
    Text,
    Tag,
} from '../../../components/Common';

export default function PatchHeader(props) {
    const dispatch = useDispatch();
    const storyRepo = useSelector(state => state.page.storyRepo);
    const prefs = useSelector(state => state.app.prefs)

    const { board, storyKey, tab, setTab, tabbedData } = props
    
    const storyInfo = storyRepo[storyKey] || {}
    const { title } = storyInfo

    const handleAdd = () => {
        dispatch(addPageToMap(storyKey, board))
    }

    const handleTabClick = (index) => {
        setTab(index)

        //save preference for future mount
        const newPref = prefs[PREF_KEY.PATCH_HEADER_TAB] || {}
        newPref[storyKey] = index
        dispatch(setPref(PREF_KEY.PATCH_HEADER_TAB, newPref))
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
                icon="table-plus"
                text="Add"
                onClick={handleAdd}
                style={{
                    marginLeft: 'auto',
                }}
            />
        )
    }

    return (
        <Row bg="blackish" color="whitish" y="c" sizes={['xs', 'xl']}>
            <DropClick
                dropdown={dropdownType.dropString}
                params={{
                    path: ['storyRepo', storyKey, 'title'],
                    placeholder: "name of patch ..."
                }}
                style={{
                    paddingRight: 10,
                }}
            >
                <Text size="l" color={title ? 'whitish' : 'darkgrey'}>
                    {title || 'Untitled'}
                </Text>
            </DropClick>
            <Row>
                {renderTag(0, 'In Progress')}
                {renderTag(1, 'Published')}
            </Row>
            {renderAdd()}
        </Row>
    )
}