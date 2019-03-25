import React from 'react'
import './PatchView.css'
import { connect } from 'react-redux'
import { Droppable } from 'react-beautiful-dnd';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

import { droppableType } from '../../common/types';
import { boardType } from '../../fields/defaults'

import PatchItem from './components/PatchItem';
import PatchList from './components/PatchList';

const SortableItem = SortableElement((props) => {
    const { index, patchInfo, storyKey } = props

    return (
        <PatchItem
            index={index}
            patchInfo={patchInfo}
        >
            <PatchList
                index={index}
                title="Developing"
                storyKey={storyKey}
            />
            <PatchList
                index={index}
                title="Published"
                storyKey={patchInfo.publishKey}
            />
        </PatchItem>
    )
})

const SortableList = SortableContainer((props) => {
    const { items, storyRepo, storyKey } = props
    const patchInfo = storyRepo[storyKey] || {}

    return (
        <div className="patch-container">
            {items.map((storyKey, index) => {
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
    const { storyMap } = props
    const stories = storyMap[boardType.roles.key]

    const areStories = !!stories

    return (
        <div className="story-view">
            {areStories && <SortableList {...props} items={stories} onSortEnd={() => {}} axis={'xy'}></SortableList>}
        </div>
    )
}

export default connect(
    state => ({
        storyRepo: state.page.storyRepo,
        storyMap: state.page.storyMap,
    }),
)(PatchView)