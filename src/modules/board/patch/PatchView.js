import React, { useState } from 'react'
import './PatchView.css'
import { connect } from 'react-redux'
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

import { boardType } from '../../fields/defaults'

import { moveStory } from '../../page/PageReducer'

import PatchItem from './components/PatchItem';
import RoleView from '../roles/RoleView';

const SortableItem = SortableElement((props) => {
    const { index, patchInfo } = props

    return (
        <PatchItem
            index={index}
            patchInfo={patchInfo}
            onClick={props.onClick}
        />
    )
})

const SortableList = SortableContainer((props) => {
    const { items, storyRepo } = props
    
    return (
        <div className="patch-container">
            {items.map((storyKey, index) => {
                const patchInfo = storyRepo[storyKey] || {}

                return (
                    <SortableItem
                        key={`item-${storyKey}`}
                        {...props}
                        storyKey={storyKey}
                        index={index}
                        patchInfo={patchInfo}
                    />
                )
            })}
        </div>
    )
})

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
                <SortableList
                    {...props}
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
        storyRepo: state.page.storyRepo,
        storyMap: state.page.storyMap,
    }),
    {
        moveStory,
    }
)(PatchView)