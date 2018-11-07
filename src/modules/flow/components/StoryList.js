import React from 'react'
import { connect } from 'react-redux'
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { navigate } from '../../navigation/NavReducer'

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
  
    // styles we need to apply on draggables
    ...draggableStyle,
    cursor: 'pointer',
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
        const { item, flowInfo, flowData } = this.props
        const isEmpty = flowData[item.key].length === 0

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
                        flowData[item.key].map((item, index) => (
                            flowInfo[item] && <Draggable key={item} draggableId={item} index={index}>
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
                                        {(flowInfo[item] && flowInfo[item].phaseName) || 'Untitled'}
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
        flowData: state.flow.flowData,
        flowInfo: state.flow.flowInfo,
    }),
    {
        navigate,
    }
)(StoryList)