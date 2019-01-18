import React from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd';
import * as helpers from '../common/helpers'

import { dropdownType } from '../dropdown/types';

import { moveStory, movePageWithinMap, movePageToOtherMap } from '../page/PageReducer'
import { moveLogic, moveField, moveTagToOtherField, moveTagWithinField } from '../fields/FieldReducer'
import { showModal } from '../modal/ModalReducer'
import { showDropdown } from '../dropdown/DropdownReducer'

class AppWrapper extends React.Component{
    constructor(props) {
        super(props)
        this.prevClick = ''
        this.originalTarget = {}
    }

    componentDidMount() {
        window.addEventListener('click', this._handleClick)
        window.addEventListener('mousedown', this._handleMouseDown)
        window.addEventListener('contextmenu', this._handleClick)
        window.addEventListener('scroll', this._handleScroll, true)
        window.addEventListener('keyup', this._onKeyPress)
    }

    componentWillUnmount() {
        window.removeEventListener('click', this._handleClick)
        window.removeEventListener('mousedown', this._handleMouseDown)
        window.removeEventListener('contextmenu', this._handleClick)
        window.removeEventListener('scroll', this._handleScroll, false)
        window.removeEventListener('keyup', this._onKeyPress)
    }

    _handleScroll = () => {
        //TODO not being handled properly, should chek the scroll container
        const { dropdownKeys } = this.props
        if (dropdownKeys.length) {
            if (dropdownKeys[0].key === dropdownType.pickVar) return
            this.props.showDropdown()
        }
    }

    _onKeyPress = e => {
        switch(e.key) {
            case 'Enter':
                return
            case 'Escape':
                if (this.props.dropdownKeys.length) {
                    return this.props.showDropdown()
                }
                return this.props.showModal()
            default:
        }
    }

    _handleMouseDown = e => {
        this.originalTarget = e.target || e.srcElement
    }

    _handleClick = (e) => {
        //Handles clicks that originated from different place
        if (e.target !== this.originalTarget) {
            return
        }

        //TODO handling still needs a bit of work
        if (helpers.isAppClickCancelled(e.target)) {
            //return
        }
        
        //check if clicking on a modal background
        if (e.target.classList.contains('modal-appclick')) {
            this.props.showModal()
            this.props.showDropdown()
            return
        }

        //if click is not inside a dropdown element, close any dropdowns
        if (!helpers.isElementDropdown(e.target)) {
            this.props.showDropdown()
        }

        if (e.target.matches('.app-onclick')) {
            const menuClick = e.target.getAttribute('menu-type')
            
            if (this.prevClick === e.target.outerHTML) {
                this.prevClick = ''
                this.props.showDropdown()
                return
            } else {
                this.prevClick = e.target.outerHTML
            }

            if (menuClick) {
                this.props.showDropdown(menuClick, e, {
                    ...JSON.parse(e.target.getAttribute('app-onclick-props')),
                })
            }
        }
    }

    onDragEnd = result => {
        const { source, destination } = result;
        
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.index === destination.index && source.droppableId === destination.droppableId) {
            return;
        }

        if (source.droppableId === 'board') {
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
                const sources = source.droppableId.split('-')
                const boardType = sources[1]

                this.props.moveField(
                    boardType,
                    source.index,
                    destination.index,
                )
            }
        } else if (source.droppableId.indexOf('TAG') !== -1) {
            let sources = source.droppableId.split('/')
            let fieldKey = sources[1]

            this.props.moveTagWithinField(
                fieldKey,
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
        dropdownKeys: state.dropdown.dropdownKeys,
    }),
    {
        moveStory,
        movePageWithinMap,
        movePageToOtherMap,
        showDropdown,
        showModal,
        moveLogic,
        moveField,
        moveTagToOtherField,
        moveTagWithinField,
    }
)(AppWrapper)