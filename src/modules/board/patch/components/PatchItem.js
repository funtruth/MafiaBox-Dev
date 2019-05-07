import React, { useState } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { SortableContainer } from 'react-sortable-hoc';

import PatchHeader from './PatchHeader';
import RoleGrid from '../../roles/RoleGrid';
import ModeGrid from '../../modes/ModeGrid';
import {
    Body,
} from '../../../components/Common';
import { IS_PUBLISHED } from '../../../common/arrows';

const PatchItem = SortableContainer((props) => {
    const { items, pageMap, pageRepo, modeMap, modeRepo } = props

    const [tab, setTab] = useState(0)

    const renderItem = (storyKey, index) => {
        const pages = _.groupBy(pageMap[storyKey], key => IS_PUBLISHED(pageRepo, key))
        const modes = _.groupBy(modeMap[storyKey], key => IS_PUBLISHED(modeRepo, key))
        const tabbedData = [
            pages.false||[],
            pages.true ||[],
            modes.false||[],
            modes.true ||[],
        ]

        return (
            <div key={`item-${storyKey}`}>
                <PatchHeader
                    storyKey={storyKey}
                    tab={tab}
                    setTab={setTab}
                    tabbedData={tabbedData}
                />
                <Body sizes={["xxs", "xxs"]} align="s">
                    {renderTab(tabbedData, index)}
                </Body>
            </div>
        )
    }

    const renderTab = (tabbedData, index) => {
        switch(tab) {
            case 0:
                return <RoleGrid items={tabbedData[0]} index={index} distance={2}/>
            case 1:
                return <RoleGrid items={tabbedData[1]} index={index} distance={2}/>
            case 2:
                return <ModeGrid items={tabbedData[2]} index={index} distance={2}/>
            case 3:
                return <ModeGrid items={tabbedData[3]} index={index} distance={2}/>
            default:
                return null;
        }
    }
    
    return (
        <div>
            {items.map(renderItem)}
        </div>
    )
})

export default connect(
    state => ({
        modeMap: state.page.modeMap,
        modeRepo: state.page.modeRepo,
        pageMap: state.page.pageMap,
        pageRepo: state.page.pageRepo,
    })
)(PatchItem)