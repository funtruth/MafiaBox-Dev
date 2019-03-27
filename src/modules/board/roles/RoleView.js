import React from 'react'
import './RoleView.css'
import { connect } from 'react-redux'

import { movePageWithinMap } from '../../page/PageReducer'

import RoleHeader from './components/RoleHeader';
import RoleGrid from './components/RoleGrid'

function RoleView(props) {
    const { storyKey, storyRepo, pageMap } = props
    
    const storyInfo = storyRepo[storyKey] || {}
    const { publishKey } = storyInfo

    const devStories = pageMap[storyKey] || []
    const pubStories = pageMap[publishKey] || []

    const handleHide = (e) => {
        if (e.target.classList.contains('role-modal')) {
            props.onHide()
        }
    }

    const onDevEnd = ({oldIndex, newIndex}) => {
        if (oldIndex === newIndex) return;
        props.movePageWithinMap(storyKey, oldIndex, newIndex)
    }

    const onPubEnd = ({oldIndex, newIndex}) => {
        if (oldIndex === newIndex) return;
        props.movePageWithinMap(publishKey, oldIndex, newIndex)
    }

    if (!storyKey) return null

    return (
        <div className="role-modal" onClick={handleHide}>
            <div className="role-view">
                <RoleHeader storyKey={storyKey} onHide={props.onHide}/>
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
