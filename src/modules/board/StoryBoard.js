import React from 'react'
import './board.css'
import { connect } from 'react-redux'
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { DEFAULT_NORMAL } from '../page/defaults';
import { droppableType } from '../common/types';

import StoryList from './components/StoryList'

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
  
    // styles we need to apply on draggables
    ...draggableStyle,
    ...styles.itemStyle,
});

const getListStyle = isDraggingOver => ({
    ...styles.listStyle,
});

class StoryBoard extends React.Component{
    render() {
        const { storyRepo, storyMap, pageRepo, boardType } = this.props
        const stories = storyMap[boardType] || []

        return (
            <div className="story-view">
                <Droppable droppableId={`${droppableType.board}.${boardType}`} direction="horizontal" type="COLUMN">
                    {(provided, snapshot) => (
                        <div
                            className="scrollable-x"
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {stories.map((storyKey, index) => {
                                const column = storyRepo[storyKey] || {}
                                const repo = pageRepo[storyKey] || DEFAULT_NORMAL
                                
                                return (
                                    <Draggable key={storyKey} draggableId={storyKey} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                            >
                                                <StoryList
                                                    storyKey={storyKey}
                                                    column={column}
                                                    repo={repo}
                                                    boardType={boardType}
                                                    dragging={snapshot.isDragging}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        )
    }
}

const styles = {
    itemStyle: {
        color: '#fff',
        lineHeight: 1.2,
        font: '500 14px Segoe UI',
        cursor: 'pointer',
        pointerEvents: 'none',
        minWidth: 200,
        marginRight: 12,
    },
    listStyle: {
        display: 'flex',
        flex: 1,
    }
}

export default connect(
    state => ({
        storyRepo: state.page.storyRepo,
        storyMap: state.page.storyMap,
        pageRepo: state.page.pageRepo,
    }),
)(StoryBoard)