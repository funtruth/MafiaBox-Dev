import React from 'react'
import './board.css'
import { connect } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { moveStory, addPageToMap, movePageWithinMap, movePageToOtherMap } from '../page/PageReducer'

import StoryList from './components/StoryList'
import StoryTitle from './components/StoryTitle';
import StoryDropDown from './components/StoryDropDown';

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
    state = {
        showMenu: false,
        storyIndex: null,
        pageX: null,
        pageY: null,
    }

    componentDidMount() {
        window.addEventListener('click', this._handleClick)
        window.addEventListener('scroll', this._handleScroll, true)
    }

    componentWillUnmount() {
        window.removeEventListener('click', this._handleClick)
        window.removeEventListener('scroll', this._handleScroll, false)
    }

    _handleScroll = () => {
        if (this.state.showMenu) {
            this.setState({
                showMenu: false
            })
        }
    }

    _handleClick = (e) => {
        if (e.target.matches('.menu-onclick')) {
            if (!this.state.showMenu || e.target.getAttribute('story-index') !== this.state.storyIndex) {
                this.setState({
                    showMenu: true,
                    storyIndex: e.target.getAttribute('story-index'),
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

    _hideMenu = () => {
        this.setState({
            showMenu: false
        })
    }

    _addPage = (mapKey) => {
        this.props.addPageToMap(mapKey)
    }

    _renderMenu() {
        let menuStyle = {
            top: this.state.pageY + 12,
            left: this.state.pageX - 84,
        }

        return (
            <div 
                className="drop-down-menu"
                style={menuStyle}
            >
                <StoryDropDown
                    storyIndex={this.state.storyIndex}
                    hideMenu={this._hideMenu}
                />
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
            this.props.moveStory(
                source.index,
                destination.index,
            )    
        } else {
            if (source.droppableId === destination.droppableId) {
                this.props.movePageWithinMap(
                    source.droppableId,
                    source.index,
                    destination.index,
                )
            } else {
                this.props.movePageToOtherMap(
                    source.droppableId,
                    destination.droppableId,
                    source.index,
                    destination.index,
                )
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
                                                <StoryTitle item={item} index={index} dragging={snapshot.isDragging}
                                                    addPage={this._addPage.bind(this, item.key)}/>
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
        storyMap: state.page.storyMap,
    }),
    {
        moveStory,
        addPageToMap,
        movePageWithinMap,
        movePageToOtherMap,
    }
)(StoryBoard)