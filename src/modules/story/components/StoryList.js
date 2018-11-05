import React from 'react'
import { connect } from 'react-redux'
import { Droppable, Draggable } from 'react-beautiful-dnd';

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

class StoryList extends React.Component{
    render() {  
        const { item, storyData } = this.props
        const isEmpty = storyData[item.key].length === 0

        return (
                <Droppable droppableId={item.key} type="ITEM">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {isEmpty?
                            <div className="story-empty">
                                {`There is nothing here yet.`}
                            </div>:
                            storyData[item.key].map((item, index) => (
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
        fontWeight: '550',
        cursor: 'pointer',
        borderRadius: '4px',
        boxShadow: 'rgba(15, 15, 15, 0.2) 0px 0px 0px 1px, rgba(15, 15, 15, 0.2) 0px 2px 4px',
        marginBottom: 6,
    },
    listStyle: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        minHeight: 250,
    },
}

export default connect(
    state => ({
        storyData: state.story.storyData,
    }),
)(StoryList)