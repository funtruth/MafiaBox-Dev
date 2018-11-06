import React from 'react'
import { connect } from 'react-redux'
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { navigate } from '../../navigation/NavReducer'

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
  
    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
    ...styles.listStyle,
});


class StoryList extends React.Component{
    _onClick = (item, snapshot) => {
        if (!snapshot.isDragging){
            this.props.navigate(`/board/${item}`)
        }
    }

    render() {  
        const { item, roles, storyData } = this.props
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
                            roles[item] && <Draggable key={item} draggableId={item} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        className="story-tag"
                                        onClick={this._onClick.bind(this, item, snapshot)}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}
                                    >
                                        {(roles[item] && roles[item].roleName) || 'Untitled'}
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
        roles: state.roles.roles,
    }),
    {
        navigate,
    }
)(StoryList)