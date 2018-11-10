import React from 'react'
import './board.css'
import { connect } from 'react-redux'
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { addPageToMap } from '../page/PageReducer'

import StoryList from './components/StoryList'
import StoryTitle from './components/StoryTitle';

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
        return (
            <div className="story-view">
                <Droppable droppableId="board" direction="horizontal" type="COLUMN">
                    {(provided, snapshot) => (
                        <div
                            className="scrollable-x"
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {this.props.storyMap.map((item, index) => (
                                item.boardType === this.props.boardType &&
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
                                                <StoryTitle
                                                    item={item}
                                                    index={index}
                                                    dragging={snapshot.isDragging}
                                                    addPage={this.props.addPageToMap.bind(this, item.key)}
                                                />
                                                <StoryList item={item} dragging={snapshot.isDragging}/>
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
    }),
    {
        addPageToMap,
    }
)(StoryBoard)