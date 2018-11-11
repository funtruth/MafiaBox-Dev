import React from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd';

import { moveStory, addPageToMap, movePageWithinMap, movePageToOtherMap } from '../page/PageReducer'
import { showDropdownByKey } from './menu/DropdownReducer'

import { menuType } from './menu/types'

class AppWrapper extends React.Component{
    componentDidMount() {
        window.addEventListener('click', this._handleClick)
        window.addEventListener('scroll', this._handleScroll, true)
    }

    componentWillUnmount() {
        window.removeEventListener('click', this._handleClick)
        window.removeEventListener('scroll', this._handleScroll, false)
    }

    _handleScroll = () => {
        if (this.props.dropdownKey) {
            this.props.showDropdownByKey()
        }
    }

    _handleClick = (e) => {
        if (e.target.matches('.menu-onclick')) {
            let menuClick = e.target.getAttribute('menu-type')
            switch(menuClick) {
                case menuType.storyShowMore:
                    if (!this.props.dropdownKey || e.target.getAttribute('story-index') !== this.props.dropdownParams.storyIndex) {
                        this.props.showDropdownByKey(menuType.storyShowMore,{
                            storyIndex: e.target.getAttribute('story-index'),
                            pageX: e.pageX,
                            pageY: e.pageY,
                        })
                    } else {
                        this.props.showDropdownByKey()
                    }
                    break
                default:
            }
        } else {
            if (!e.target.matches('.drop-down-menu') && !e.target.matches('.drop-down-menu-option') && this.props.dropdownKey) {
                this.props.showDropdownByKey()
            }
        }
    }

    _hideMenu = () => {
        this.props.showDropdownByKey()
    }

    _addPage = (mapKey) => {
        this.props.addPageToMap(mapKey)
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
            </DragDropContext>
        )
    }
}

export default connect(
    state => ({
        storyMap: state.page.storyMap,
        dropdownKey: state.dropdown.dropdownKey,
        dropdownParams: state.dropdown.dropdownParams,
    }),
    {
        moveStory,
        addPageToMap,
        movePageWithinMap,
        movePageToOtherMap,
        showDropdownByKey,
    }
)(AppWrapper)