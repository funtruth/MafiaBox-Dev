import React from 'react'
import { connect } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { reorderBoard, reorderItem, relocateItem } from '../StoryReducer'
import { createNewRole } from '../../roles/RoleReducer'

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
    state = {
        showMenu: false,
        storyId: null,
        pageX: null,
        pageY: null,
    }

    componentDidMount() {
        window.addEventListener('click', this._handleClick)
    }

    _handleClick = (e) => {
        if (e.target.matches('.menu-onclick')) {
            if (!this.state.showMenu || e.target.getAttribute('story-id') !== this.state.storyId) {
                this.setState({
                    showMenu: true,
                    storyId: e.target.getAttribute('story-id'),
                    pageX: e.pageX,
                    pageY: e.pageY
                })
            } else {
                this.setState({
                    showMenu: false
                })
            }
        } else {
            if (!e.target.matches('.drop-down-menu') && !e.target.matches('.drop-down-menu-option') && this.state.showMenu) {
                this.setState({
                    showMenu: false
                })
            }
        }
    }

    _addRole = (key) => {
        this.props.createNewRole({ roleStoryKey: key })
    }

    _renderMenu() {
        let menuStyle = {
            top: this.state.pageY + 12,
            left: this.state.pageX - 84,
        }

        return (
            <div 
                class="drop-down-menu"
                style={menuStyle}
            >
                <div class="drop-down-menu-option">
                    <i class={`drop-down-menu-icon ion-ios-trash`}></i>
                    Delete
                </div>
                <div class="drop-down-menu-separator"/>
                <div class="drop-down-menu-option">hidfs</div>
                <div class="drop-down-menu-option">hiqweqt</div>
            </div>
        )
    }


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
                            className="scrollable-x"
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {this.props.stories.map((item, index) => (
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
                                            <StoryTitle item={item} dragging={snapshot.isDragging}
                                                addRole={this._addRole.bind(this, item.key)}/>
                                            <StoryList item={item} dragging={snapshot.isDragging}/>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                {this.state.showMenu && this._renderMenu()}
            </DragDropContext>
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
        stories: state.story.stories,
        storyData: state.story.storyData,
    }),
    {
        reorderBoard,
        reorderItem,
        relocateItem,
        createNewRole,
    }
)(StoryBoard)