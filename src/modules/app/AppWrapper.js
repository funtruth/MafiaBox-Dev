import React from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd';

import { moveStory, movePageWithinMap, movePageToOtherMap } from '../page/PageReducer'
import { moveLogic } from '../fields/FieldReducer'
import { showModalByKey } from '../modal/ModalReducer'
import { showDropdownByKey } from '../dropdown/DropdownReducer'

import { dropdownType } from '../dropdown/types'

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
            switch(menuClick) {
                case dropdownType.storyShowMore:
                    if (!this.props.dropdownKeys.length ||
                        e.target.getAttribute('story-index') !== this.props.dropdownParams.storyIndex) {
                        this.props.showDropdownByKey(dropdownType.storyShowMore, {
                            storyIndex: e.target.getAttribute('story-index'),
                            pageX: e.pageX,
                            pageY: e.pageY,
                        })
                    } else {
                        this.props.showDropdownByKey()
                    }
                    break
                case dropdownType.showOtherOptions:
                    if (!this.props.dropdownKeys.length ||
                        e.target.getAttribute('field-key') !== this.props.dropdownParams.fieldKey) {
                        this.props.showDropdownByKey(dropdownType.showOtherOptions, {
                            fieldKey: e.target.getAttribute('field-key'),
                            pageKey: e.target.getAttribute('page-key'),
                            subfieldKey: e.target.getAttribute('subfield-key'),
                            indexKey: e.target.getAttribute('index-key'),
                            pageX: e.pageX - e.offsetX,
                            pageY: e.pageY - e.offsetY + 28,
                        })
                    } else {
                        this.props.showDropdownByKey()
                    }
                    break
                case dropdownType.showLibrary:
                    if (!this.props.dropdownKeys.length ||
                        e.target.getAttribute('field-key') !== this.props.dropdownParams.fieldKey) {
                        this.props.showDropdownByKey(dropdownType.showLibrary, {
                            fieldKey: e.target.getAttribute('field-key'),
                            pageKey: e.target.getAttribute('page-key'),
                            subfieldKey: e.target.getAttribute('subfield-key'),
                            indexKey: e.target.getAttribute('index-key'),
                            pageX: e.pageX - e.offsetX,
                            pageY: e.pageY - e.offsetY + 28,
                        })
                    } else {
                        this.props.showDropdownByKey()
                    }
                    break
                case dropdownType.showLogic:
                    if (!this.props.dropdownKeys.length ||
                        e.target.getAttribute('field-key') !== this.props.dropdownParams.fieldKey) {
                        this.props.showDropdownByKey(dropdownType.showLogic, {
                            fieldKey: e.target.getAttribute('field-key'),
                            pageKey: e.target.getAttribute('page-key'),
                            indexKey: e.target.getAttribute('index-key'),
                            pageX: e.pageX - e.offsetX - 15,
                            pageY: e.pageY - e.offsetY + 28,
                        })
                    } else {
                        this.props.showDropdownByKey()
                    }
                    break
                case dropdownType.deleteLogic:
                    if (!this.props.dropdownKeys.length ||
                        e.target.getAttribute('field-key') !== this.props.dropdownParams.fieldKey) {
                        this.props.showDropdownByKey(dropdownType.deleteLogic, {
                            fieldKey: e.target.getAttribute('field-key'),
                            pageKey: e.target.getAttribute('page-key'),
                            indexKey: e.target.getAttribute('index-key'),
                            pageX: e.pageX - e.offsetX + 28,
                            pageY: e.pageY - e.offsetY - 6,
                        })
                    } else {
                        this.props.showDropdownByKey()
                    }
                    break
                case dropdownType.editTag:
                    if (!this.props.dropdownKeys.length ||
                        e.target.getAttribute('field-key') !== this.props.dropdownParams.fieldKey) {
                            this.props.showDropdownByKey(dropdownType.editTag, {
                                indexKey: e.target.getAttribute('index-key'),
                                tagKey: e.target.getAttribute('tag-key'),
                                fieldKey: e.target.getAttribute('field-key'),
                                pageX: e.pageX - e.offsetX - 8,
                                pageY: e.pageY - e.offsetY + 28,
                            })
                    } else {
                        this.props.showDropdownByKey()
                    }
                    break
                case dropdownType.createSomething:
                    if (!this.props.dropdownKeys.length ||
                        e.target.getAttribute('field-key') !== this.props.dropdownParams.fieldKey) {
                            this.props.showDropdownByKey(dropdownType.createSomething, {
                                tagKey: e.target.getAttribute('tag-key'),
                                fieldKey: e.target.getAttribute('field-key'),
                                pageX: e.pageX - e.offsetX - 8,
                                pageY: e.pageY - e.offsetY + 28,
                            })
                    } else {
                        this.props.showDropdownByKey()
                    }
                    break
                default:
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
    }
)(AppWrapper)