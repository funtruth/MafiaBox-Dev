import React from 'react'
import { connect } from 'react-redux'
import { SortableContainer } from 'react-sortable-hoc';

import { boardType } from '../../../fields/defaults';

import { addStory } from '../../../page/PageReducer'

import PatchGridItem from './PatchGridItem';
import EmptyGridComponent from '../../components/EmptyGridComponent';

const PatchGrid = SortableContainer((props) => {
    const { items } = props

    const handleAdd = () => {
        props.addStory(boardType.roles.key)
    }
    
    return (
        <div className="patch-container">
            {items.map((storyKey, index) => {
                return (
                    <PatchGridItem
                        key={`item-${storyKey}`}
                        storyKey={storyKey}
                        index={index}
                        onClick={props.onClick}
                    />
                )
            })}
            <EmptyGridComponent className="patch-item" text="New Patch" onClick={handleAdd}/>
        </div>
    )
})

export default connect(
    null,
    {
        addStory,
    }
)(PatchGrid)