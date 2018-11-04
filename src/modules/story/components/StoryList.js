import React from 'react'
import { connect } from 'react-redux'
import { Droppable, Draggable } from 'react-beautiful-dnd';

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

class StoryList extends React.Component{
    render() {
        const { item, storyData } = this.props
        return (
            <div style={styles.listStyle}>
                <Droppable droppableId={item}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={[
                                getListStyle(snapshot.isDraggingOver),
                                styles.listStyle,
                            ]}
                        >
                            {storyData[item].map((item, index) => (
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
    container: {
        flex: 1,
    },
    itemStyle: {
        color: '#fff',
        fontSize: 14,
        lineHeight: 1.2,
        fontFamily: 'Arial',
        fontWeight: '500',
        width: 200,
    },
    listStyle: {
        backgroundColor: 'red',
        pointerEvents: 'auto',
    },
}

export default connect(
    state => ({
        storyData: state.story.storyData,
    }),
)(StoryList)