import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { SortableElement } from 'react-sortable-hoc';

import { IS_PUBLISHED } from '../../../common/arrows';
import { movePageWithinMap } from '../../../page/PageReducer'
import { PREF_KEY } from '../../../app/AppReducer'

import PatchHeader from './PatchHeader';
import RoleGrid from '../../roles/RoleGrid';
import ModeGrid from '../../modes/ModeGrid';
import {
    Body,
} from '../../../components/Common';

const PatchItem = SortableElement((props) => {
    const { storyKey, pageMap, pageRepo, modeMap, modeRepo, prefs } = props

    const prefValue = (prefs[PREF_KEY.PATCH_HEADER_TAB] && prefs[PREF_KEY.PATCH_HEADER_TAB][storyKey])||0

    const [tab, setTab] = useState(prefValue)
    const [tabbedData, setTabbedData] = useState([[], [], [], []])

    useEffect(() => {
        const pages = _.groupBy(pageMap[storyKey], key => IS_PUBLISHED(pageRepo, key))
        const modes = _.groupBy(modeMap[storyKey], key => IS_PUBLISHED(modeRepo, key))

        setTabbedData([
            pages.false||[],
            pages.true ||[],
            modes.false||[],
            modes.true ||[],
        ])
    }, [pageRepo, modeRepo])

    const onSortPage = ({oldIndex, newIndex}) => {
        if (oldIndex === newIndex) return;
        props.movePageWithinMap('pageMap', storyKey, oldIndex, newIndex)
    }
    
    const onSortMode = ({oldIndex, newIndex}) => {
        if (oldIndex === newIndex) return;
        props.movePageWithinMap('modeMap', storyKey, oldIndex, newIndex)
    }

    const renderTab = (tabbedData) => {
        switch(tab) {
            case 0:
                return <RoleGrid items={tabbedData[0]} distance={2} onSortEnd={onSortPage}/>
            case 1:
                return <RoleGrid items={tabbedData[1]} distance={2} onSortEnd={onSortPage}/>
            case 2:
                return <ModeGrid items={tabbedData[2]} distance={2} onSortEnd={onSortMode}/>
            case 3:
                return <ModeGrid items={tabbedData[3]} distance={2} onSortEnd={onSortMode}/>
            default:
                return null;
        }
    }

    return (
        <div key={`item-${storyKey}`}>
            <PatchHeader
                storyKey={storyKey}
                tab={tab}
                setTab={setTab}
                tabbedData={tabbedData}
            />
            <Body sizes={["xxs", "xxs"]} align="s">
                {renderTab(tabbedData)}
            </Body>
        </div>
    )
})

export default connect(
    state => ({
        modeMap: state.page.modeMap,
        modeRepo: state.page.modeRepo,
        pageMap: state.page.pageMap,
        pageRepo: state.page.pageRepo,
        prefs: state.app.prefs,
    }),
    {
        movePageWithinMap,
    }
)(PatchItem)