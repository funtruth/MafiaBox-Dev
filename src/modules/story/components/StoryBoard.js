import React from 'react'
import { connect } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { reorderBoard, reorderItem, relocateItem } from '../StoryReducer'

import StoryList from './StoryList'
import StoryTitle from './StoryTitle';

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

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

class StoryBoard extends React.Component{
    onDragEnd = result => {
        const { source, destination } = result;
        
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === 'board') {
            if (source.index === destination.index) return
            
            const items = reorder(
                this.props.stories,
                source.index,
                destination.index
            );
    
            this.props.reorderBoard(items)
        } else {
            if (source.droppableId === destination.droppableId) {
                const items = reorder(
                    this.props.storyData[source.droppableId],
                    source.index,
                    destination.index
                );
                
                this.props.reorderItem(source.droppableId, items)
            } else {
                const result = move(
                    this.props.storyData[source.droppableId],
                    this.props.storyData[destination.droppableId],
                    source,
                    destination
                );
    
                this.props.relocateItem(result)
            }
        }
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
                <Droppable droppableId="board" direction="horizontal" type="COLUMN">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {this.props.stories.map((item, index) => (
                                <Draggable key={item} draggableId={item} index={index}>
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
                                            <StoryTitle item={item}/>
                                            <StoryList item={item}/>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        )
    }
}

const styles = {
    itemStyle: {
        color: '#fff',
        fontSize: 14,
        lineHeight: 1.2,
        fontFamily: 'Arial',
        fontWeight: '500',
        cursor: 'pointer',
        pointerEvents: 'none',
        width: 220,
        marginRight: 10,
    },
    listStyle: {
        display: 'flex',
        overflow: 'auto',
        minHeight: 400,
    }
}

export default connect(
    state => ({
        history: state.roles.history,
        stories: state.story.stories,
        storyData: state.story.storyData,
    }),
    {
        reorderBoard,
        reorderItem,
        relocateItem,
    }
)(StoryBoard)