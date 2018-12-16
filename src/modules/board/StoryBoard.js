import React from 'react'
import './board.css'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { addPageToMap } from '../page/PageReducer'

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
        const { storyMap, pageRepo, boardType } = this.props
        let filteredStoryMap = _.filter(storyMap, i => i.boardType === boardType)
        let filteredPageRepo = _.filter(pageRepo, i => i.boardType === boardType)
        
        filteredStoryMap = _.sortBy(filteredStoryMap, i => i.index)
        filteredPageRepo = _.sortBy(filteredPageRepo, i => i.index)

        return (
            <div className="story-view">
                <Droppable droppableId="board" direction="horizontal" type="COLUMN">
                    {(provided, snapshot) => (
                        <div
                            className="scrollable-x"
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {filteredStoryMap.map((item, index) => (
                                <Draggable key={item.key} draggableId={item.key} index={index}>
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
                                                item={item}
                                                storyIndex={index}
                                                boardType={boardType}
                                                dragging={snapshot.isDragging}
                                                repo={filteredPageRepo}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
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
        font: '500 14px Arial',
        cursor: 'pointer',
        pointerEvents: 'none',
        minWidth: 180,
        marginRight: 12,
    },
    listStyle: {
        display: 'flex',
        overflow: 'auto',
        minHeight: 'calc(100vh - 76px)',
    }
}

export default connect(
    state => ({
        storyMap: state.page.storyMap,
        pageRepo: state.page.pageRepo,
    }),
    {
        addPageToMap,
    }
)(StoryBoard)