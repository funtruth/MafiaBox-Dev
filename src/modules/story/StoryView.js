import React from 'react'
import './story.css'
import { connect } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { reorderStories, moveStory } from './StoryReducer'

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
  
    // styles we need to apply on draggables
    ...draggableStyle,
    ...styles.itemStyle,
    cursor: 'pointer',
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightred' : 'lightyellow',
    display: 'flex',
    overflow: 'auto',
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

class StoryView extends React.Component{
    onDragEnd = result => {
        const { source, destination } = result;
    
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === 'board') {
            const items = reorder(
                this.props.stories,
                source.index,
                destination.index
            );
    
            this.props.reorderStories(items)
        } else {
            if (source.droppableId === destination.droppableId) {
                const items = reorder(
                    this.props.storyData[source.droppableId],
                    source.index,
                    destination.index
                );
    
                let state = { items };
    
                if (source.droppableId === 'droppable2') {
                    state = { items2: items };
                }
    
                this.setState(state);
            } else {
                const result = move(
                    this.props.storyData[source.droppableId],
                    this.props.storyData[destination.droppableId],
                    source,
                    destination
                );
    
                this.props.moveStory(result)
            }
        }

        
    }

    render() {
        if (!this.props.storyData) return null
        return (
            <div style={styles.container}>
                <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
                    <Droppable droppableId="board" direction="horizontal" type="HELLO">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {this.props.stories.map((item, index) => (
                                <div>
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
                                        <div className="story-tag">{item}</div>
                                        <div
                                            style={styles.listStyle}
                                        >
                                            <Droppable droppableId={item}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    style={[
                                                        getListStyle(snapshot.isDraggingOver),
                                                        styles.listStyle,
                                                    ]}
                                                >
                                                    {this.props.storyData[item].map((item, index) => (
                                                        <div>
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
                                                                <div className="story-tag">{item}</div>
                                                                </div>
                                                            )}
                                                            </Draggable>
                                                        </div>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                            </Droppable>
                                        </div>
                                        </div>
                                    )}
                                    </Draggable>
                                    
                                </div>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                    </Droppable>
                </DragDropContext>
            </div>
        )
    }
}

const styles = {
    container: {
        flex: 1,
    },
    itemStyle: {
        padding: '10px 12px',
        marginBottom: 8,
        color: '#fff',
        fontSize: 14,
        lineHeight: 1.2,
        fontFamily: 'Arial',
        fontWeight: '500',

        width: 200,
    },
    listStyle: {
        minHeight: 200,
    },
    vertical: {
        display: 'flex',
        flexDirection: 'column',
    }
}

export default connect(
    state => ({
        history: state.roles.history,
        stories: state.story.stories,
        storyData: state.story.storyData,
    }),
    {
        reorderStories,
        moveStory,
    }
)(StoryView)