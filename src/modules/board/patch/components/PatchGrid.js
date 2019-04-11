import React from 'react'
import { connect } from 'react-redux'
import { SortableContainer } from 'react-sortable-hoc';

import { addStory } from '../../../page/PageReducer'
import { navigate } from '../../../navigation/NavReducer'

import PatchGridItem from './PatchGridItem';
import EmptyGridComponent from '../../components/EmptyGridComponent';

const PatchGrid = SortableContainer((props) => {
    const { items, boardType, location } = props

    const handleClick = (storyKey) => {
        if (!storyKey) return;
        props.navigate(location.pathname + '/' + storyKey)
    }

    const handleAdd = () => {
        props.addStory(boardType)
    }
    
    return (
        <div className="patch-container">
            {items.map((storyKey, index) => {
                return (
                    <PatchGridItem
                        key={`item-${storyKey}`}
                        storyKey={storyKey}
                        index={index}
                        onClick={handleClick}
                    />
                )
            })}
            <EmptyGridComponent
                className="patch-item"
                text="New Patch"
                onClick={handleAdd}
            />
        </div>
    )
})

export default connect(
    null,
    {
        addStory,
        navigate,
    }
)(PatchGrid)