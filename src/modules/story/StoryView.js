import React from 'react'
import './story.css'
import { connect } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
  
    // change background colour if dragging
    background: isDragging ? 'rgba(84, 87, 93, 1)' : 'rgba(66, 70, 77, 1)',
  
    // styles we need to apply on draggables
    ...draggableStyle,
    ...styles.itemStyle,
    cursor: 'pointer',
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
    constructor(props) {
        super(props);
        this.state = {
            items: ['Doctor', 'Hunter'],
            items2: ['Sicker', 'Mafia', 'Evil Guy'],
        };

        this.id2List = {
            droppable: 'items',
            droppable2: 'items2'
        };

        this.getList = id => this.state[this.id2List[id]];

        this.onDragEnd = result => {
            const { source, destination } = result;
    
            // dropped outside the list
            if (!destination) {
                return;
            }
    
            if (source.droppableId === destination.droppableId) {
                const items = reorder(
                    this.getList(source.droppableId),
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
                    this.getList(source.droppableId),
                    this.getList(destination.droppableId),
                    source,
                    destination
                );
    
                this.setState({
                    items: result.droppable,
                    items2: result.droppable2
                });
            }
        };
    }

    render() {
        return (
            <div style={styles.container}>
                <div className="row">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={{ width: 200 }}
                        >
                            <div className="story-tag">{this.props.stories[0].tag}</div>
                            {this.state.items.map((item, index) => (
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
                                    {item}
                                    </div>
                                )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                    </Droppable>
                    <Droppable droppableId="droppable2">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={{ width: 200 }}
                        >
                            <div className="story-tag">{this.props.stories[1].tag}</div>
                            {this.state.items2.map((item, index) => (
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
                                    {item}
                                    </div>
                                )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                    </Droppable>
                </DragDropContext>
                </div>
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
        borderRadius: 4,
        marginBottom: 8,
        color: '#fff',
        fontSize: 14,
        lineHeight: 1.2,
        fontFamily: 'Arial',
        fontWeight: '500'
    }
}

export default connect(
    state => ({
        history: state.roles.history,
        stories: state.story.stories,
    })
)(StoryView)