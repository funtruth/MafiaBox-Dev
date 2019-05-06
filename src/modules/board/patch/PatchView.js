import React from 'react'
import './PatchView.css'
import '../roles/RoleView.css'
import { connect } from 'react-redux'
import _ from 'lodash'

import { boardType } from '../../fields/defaults'

import { moveStory } from '../../page/PageReducer'

import PatchGrid from './components/PatchGrid';

function PatchView(props) {
    const { storyMap } = props

    const onSortEnd = ({oldIndex, newIndex}) => {
        if (oldIndex === newIndex) return;
        props.moveStory(boardType.roles.key, oldIndex, newIndex)
    }

    const items = _.toArray(storyMap)

    return (
        <div className="story-view" style={{flexDirection: "column"}}>
            <PatchGrid
                items={items}
                onSortEnd={onSortEnd}
                transitionDuration={500}
                distance={2}
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