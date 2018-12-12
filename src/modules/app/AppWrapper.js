import React from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd';

import { moveStory, movePageWithinMap, movePageToOtherMap } from '../page/PageReducer'
import { moveLogic, moveField, moveTagToOtherField, moveTagWithinField } from '../fields/FieldReducer'
import { showModalByKey } from '../modal/ModalReducer'
import { showDropdownByKey } from '../dropdown/DropdownReducer'

class AppWrapper extends React.Component{
    componentDidMount() {
        window.addEventListener('click', this._handleClick)
        window.addEventListener('scroll', this._handleScroll, true)
        window.addEventListener('keyup', this._onKeyPress)
    }

    componentWillUnmount() {
        window.removeEventListener('click', this._handleClick)
        window.removeEventListener('scroll', this._handleScroll, false)
        window.removeEventListener('keyup', this._onKeyPress)
    }

    _handleScroll = () => {
        if (this.props.dropdownKeys.length) {
            this.props.showDropdownByKey()
        }
    }

    _onKeyPress = e => {
        switch(e.key) {
            case 'Enter':
                return
            case 'Escape':
                if (this.props.dropdownKeys.length) {
                    return this.props.showDropdownByKey()
                }
                return this.props.showModalByKey()
            default:
        }
    }

    _handleClick = (e) => {
        if (e.target.matches('.menu-onclick')) {
            let menuClick = e.target.getAttribute('menu-type')

            if (menuClick) {
                if (!this.props.dropdownKeys.length ||
                    e.target.getAttribute('field-key') !== this.props.dropdownParams.fieldKey) {
                        this.props.showDropdownByKey(menuClick, {
                            indexKey: e.target.getAttribute('index-key'),
                            tagKey: e.target.getAttribute('tag-key'),
                            fieldKey: e.target.getAttribute('field-key'),
                            subfieldKey: e.target.getAttribute('subfield-key'),
                            pageKey: e.target.getAttribute('page-key'),
                            pageX: e.pageX - e.offsetX - 8,
                            pageY: e.pageY - e.offsetY + 28,
                        })
                } else {
                    this.props.showDropdownByKey()
                }
            }
        } else if (e.target.matches('.menu-voidclick')) {
            //negate the click from closing
        } else {
            if (!e.target.matches('.drop-down-menu') && !e.target.matches('.drop-down-menu-option')
                && this.props.dropdownKeys.length) {
                this.props.showDropdownByKey()
            }
        }
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
        } else if (source.droppableId.indexOf('CIRCUIT') !== -1) {
            if (source.droppableId === destination.droppableId) {
                let sources = source.droppableId.split('/')
                let pageKey = sources[1]
                let fieldKey = sources[2]
                let origin = sources[3]

                this.props.moveLogic(
                    pageKey,
                    fieldKey,
                    origin,
                    source.index,
                    destination.index,
                )
            }
        } else if (source.droppableId.indexOf('TEMPLATE') !== -1) {
            if (source.droppableId === destination.droppableId) {
                let sources = source.droppableId.split('-')
                let fieldMapKey = sources[1]

                this.props.moveField(
                    fieldMapKey,
                    source.index,
                    destination.index,
                )
            }
        } else if (source.droppableId.indexOf('TAG') !== -1) {
            if (source.droppableId === destination.droppableId) {
                let sources = source.droppableId.split('/')
                let fieldKey = sources[1]

                this.props.moveTagWithinField(
                    fieldKey,
                    source.index,
                    destination.index,
                )
            } else {
                let sources = source.droppableId.split('/')
                let dests = destination.droppableId.split('/')
                let startFieldKey = sources[1]
                let endFieldKey = dests[1]

                this.props.moveTagToOtherField(
                    startFieldKey,
                    endFieldKey,
                    source.index,
                    destination.index
                )
            }
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
        dropdownKeys: state.dropdown.dropdownKeys,
        dropdownParams: state.dropdown.dropdownParams,
    }),
    {
        moveStory,
        movePageWithinMap,
        movePageToOtherMap,
        showDropdownByKey,
        showModalByKey,
        moveLogic,
        moveField,
        moveTagToOtherField,
        moveTagWithinField,
    }
)(AppWrapper)