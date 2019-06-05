import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { IS_PUBLISHED } from '../../../common/arrows';
import { movePageWithinMap } from '../../../page/PageReducer'
import { PREF_KEY } from '../../../app/AppReducer'

import PatchHeader from './PatchHeader';
import RoleGrid from './RoleGrid';
import {
    Body,
} from '../../../components/Common';

function PatchItem(props) {
    const { board, storyKey, pageMap, pageRepo, prefs } = props

    const prefValue = (prefs[PREF_KEY.PATCH_HEADER_TAB] && prefs[PREF_KEY.PATCH_HEADER_TAB][storyKey])||0

    const [tab, setTab] = useState(prefValue)
    const [tabbedData, setTabbedData] = useState([[], []])

    useEffect(() => {
        const pages = _(pageMap[storyKey])
            .filter(key => pageRepo[key].board === board)
            .groupBy(key => IS_PUBLISHED(key, pageRepo))
            .value()
            
        setTabbedData([
            pages.false||[],
            pages.true ||[],
        ])
    }, [pageRepo, board])

    /*maps are split into two arrays above, based on publishing
      react-sortable-hoc will use indexes from the two arrays
      as a result, the actual index in the original array may differ.
      these functions get the real indexes
    */
    const pageIndex = (index) => pageMap[storyKey].indexOf(tabbedData[tab][index])

    const onSortPage = ({oldIndex, newIndex}) => {
        if (oldIndex === newIndex) return;
        props.movePageWithinMap(
            'pageMap',
            storyKey,
            pageIndex(oldIndex),
            pageIndex(newIndex),
        )
    }

    return (
        <div key={`item-${storyKey}`}>
            <PatchHeader
                storyKey={storyKey}
                board={board}
                tab={tab}
                setTab={setTab}
                tabbedData={tabbedData}
            />
            <Body sizes={["xxs", "xxs"]} align="s">
                <RoleGrid
                    items={tabbedData[tab]}
                    board={board}
                    distance={2}
                    onSortEnd={onSortPage}
                />
            </Body>
        </div>
    )
}

export default connect(
    state => ({
        pageMap: state.page.pageMap,
        pageRepo: state.page.pageRepo,
        prefs: state.app.prefs,
    }),
    {
        movePageWithinMap,
    }
)(PatchItem)