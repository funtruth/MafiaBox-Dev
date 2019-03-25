import React from 'react'
import './PatchView.css'
import { connect } from 'react-redux'
import { Droppable } from 'react-beautiful-dnd';

import { droppableType } from '../../common/types';
import { boardType } from '../../fields/defaults'

import PatchItem from './components/PatchItem';
import PatchList from './components/PatchList';

const getListStyle = isDraggingOver => ({
    
});

function PatchView(props) {
    const { storyRepo, storyMap } = props
    const stories = storyMap[boardType.roles.key]

    const areStories = !!stories

    return (
        <div className="story-view">
            <Droppable
                droppableId={`${droppableType.board}.${boardType.roles.key}`}
                type="COLUMN"
            >
                {(provided, snapshot) => (
                    <div
                        className="patch-container"
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                    >
                        {areStories && stories.map((storyKey, index) => {
                            const patchInfo = storyRepo[storyKey] || {}
                            
                            return (
                                <PatchItem
                                    key={storyKey}
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
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default connect(
    state => ({
        storyRepo: state.page.storyRepo,
        storyMap: state.page.storyMap,
    }),
)(PatchView)