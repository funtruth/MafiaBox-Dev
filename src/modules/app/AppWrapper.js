import React from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend';

import * as helpers from '../common/helpers'

import { showModal } from '../modal/ModalReducer'
import { showDropdown } from '../dropdown/DropdownReducer'

import AuthWrapper from '../auth/AuthWrapper'

class AppWrapper extends React.Component{
    constructor(props) {
        super(props)
        this.originalTarget = {}
    }

    componentDidMount() {
        window.addEventListener('click', this._handleClick)
        window.addEventListener('mousedown', this._handleMouseDown)
        window.addEventListener('contextmenu', this._handleClick)
        window.addEventListener('keyup', this._onKeyPress)
    }

    componentWillUnmount() {
        window.removeEventListener('click', this._handleClick)
        window.removeEventListener('mousedown', this._handleMouseDown)
        window.removeEventListener('contextmenu', this._handleClick)
        window.removeEventListener('keyup', this._onKeyPress)
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
        
        if (e.target.classList.contains('drop-down-pause')) {
            this.props.showDropdown()
            return;
        }
    }

    render() {
        return (
            <AuthWrapper>
                {this.props.children}
            </AuthWrapper>
        )
    }
}

export default DragDropContext(HTML5Backend)(connect(
    state => ({
        dropdownKeys: state.dropdown.dropdownKeys,
    }),
    {
        showDropdown,
        showModal,
    }
)(AppWrapper))