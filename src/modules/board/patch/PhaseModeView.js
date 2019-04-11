import React from 'react'
import './PatchView.css'
import { connect } from 'react-redux'

import { boardType } from '../../fields/defaults'

import { moveStory } from '../../page/PageReducer'

import PatchGrid from './components/PatchGrid';

function PhaseModeView(props) {
    const { storyMap } = props
    const stories = storyMap[boardType.phases.key]

    const areStories = !!stories

    const onSortEnd = ({oldIndex, newIndex}) => {
        if (oldIndex === newIndex) return;
        props.moveStory(boardType.phases.key, oldIndex, newIndex)
    }

    return (
        <div className="story-view">
            {areStories &&
                <PatchGrid
                    {...props}
                    items={stories}
                    boardType={boardType.phases.key}
                    onSortEnd={onSortEnd}
                    axis={'xy'}
                    transitionDuration={500}
                    distance={2}
                />
            }
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
)(PhaseModeView)