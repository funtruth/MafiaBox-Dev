import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { SortableContainer } from 'react-sortable-hoc'

import { moveStory } from '../../page/PageReducer'

import PatchItem from './components/PatchItem';

const PatchGrid = SortableContainer(({items}) => {
    return (
        <div>
            {items.map((storyKey, index) => (
                <PatchItem
                    key={`patch-${storyKey}`}
                    index={index}
                    storyKey={storyKey}
                />
            ))}
        </div>
    )
})

function PatchView(props) {
    const { storyMap } = props

    const onSortEnd = ({oldIndex, newIndex}) => {
        if (oldIndex === newIndex) return;
        props.moveStory(oldIndex, newIndex)
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