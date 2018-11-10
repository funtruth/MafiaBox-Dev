import React from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd';

import { moveStory, addPageToMap, movePageWithinMap, movePageToOtherMap } from '../page/PageReducer'

import { menuType } from './types'

import StoryDropDown from '../board/components/StoryDropDown';

class AppWrapper extends React.Component{
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
            let menuClick = e.target.getAttribute('menuType')
            switch(menuClick) {
                case menuType.storyShowMore:
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
                    break
                default:
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
            <DragDropContext onDragEnd={this.onDragEnd}>
                {this.props.children}
                {this.state.showMenu && this._renderMenu()}
            </DragDropContext>
        )
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
)(AppWrapper)