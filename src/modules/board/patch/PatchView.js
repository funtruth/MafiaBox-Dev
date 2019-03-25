import React, { useState } from 'react'
import './PatchView.css'
import { connect } from 'react-redux'

import { boardType } from '../../fields/defaults'

import { moveStory } from '../../page/PageReducer'

import RoleView from '../roles/RoleView';
import PatchGrid from './components/PatchGrid';

function PatchView(props) {
    const [selectedStory, setSelectedStory] = useState("")

    const { storyMap } = props
    const stories = storyMap[boardType.roles.key]

    const areStories = !!stories

    const onSortEnd = ({oldIndex, newIndex}) => {
        props.moveStory(boardType.roles.key, oldIndex, newIndex)
    }

    const handleClick = (storyKey) => setSelectedStory(storyKey)
    const handleHide = () => setSelectedStory("")

    return (
        <div className="story-view">
            {areStories &&
                <PatchGrid
                    items={stories}
                    onSortEnd={onSortEnd}
                    onClick={handleClick}
                    axis={'xy'}
                    transitionDuration={500}
                    distance={2}
                />
            }
            <RoleView
                storyKey={selectedStory}
                onHide={handleHide}
            />
        </div>
    )
}

export default connect(
    state => ({
        storyMap: state.page.storyMap,
    }),
    {
        moveStory,
    }
)(PatchView)