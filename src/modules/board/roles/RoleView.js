import React from 'react'
import './RoleView.css'
import { connect } from 'react-redux'

import {
    movePageWithinMap,
} from '../../page/PageReducer'

import RoleHeader from './components/RoleHeader';
import RoleGrid from './components/RoleGrid'

function RoleView(props) {
    const { match, storyRepo, pageMap } = props
    const { params } = match
    const { storyKey } = params
    
    const storyInfo = storyRepo[storyKey] || {}
    const { publishKey } = storyInfo

    const devStories = pageMap[storyKey] || []
    const pubStories = pageMap[publishKey] || []

    const onDevEnd = ({oldIndex, newIndex}) => {
        if (oldIndex === newIndex) return;
        props.movePageWithinMap(storyKey, oldIndex, newIndex)
    }

    const onPubEnd = ({oldIndex, newIndex}) => {
        if (oldIndex === newIndex) return;
        props.movePageWithinMap(publishKey, oldIndex, newIndex)
    }

    return (
        <div className="role-view">
            <RoleHeader storyKey={storyKey}/>
            <RoleGrid
                storyKey={storyKey}
                items={devStories}
                title="In Development"
                onSortEnd={onDevEnd}
                axis={'xy'}
                transitionDuration={500}
                distance={2}
            />
            <RoleGrid
                storyKey={publishKey}
                hideAdd
                items={pubStories}
                title="Published"
                onSortEnd={onPubEnd}
                axis={'xy'}
                transitionDuration={500}
                distance={2}
            />
        </div>
    )
}

export default connect(
    state => ({
        storyRepo: state.page.storyRepo,
        pageRepo: state.page.pageRepo,
        pageMap: state.page.pageMap,
    }),
    {
        movePageWithinMap,
    }
)(RoleView)
