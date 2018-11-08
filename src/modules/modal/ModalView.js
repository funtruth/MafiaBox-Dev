import React from 'react'
import './modals.css'
import { connect } from 'react-redux'

import { showModalByKey } from './ModalReducer'

import { modalType } from './modalConfig'

import DeleteRole from './keys/DeleteRole';
import AddNewStory from './keys/AddNewStory'
import AddNewField from './keys/AddNewField'
import DeleteStory from './keys/DeleteStory';
import AddNewPhase from './keys/AddNewPhase';
import AddFlowStory from './keys/AddFlowStory.js';
import PageModal from './keys/PageModal';

class ModalView extends React.Component {
    componentDidMount() {
        window.addEventListener('keyup', this._onKeyPress)
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this._onKeyPress)
    }

    _onKeyPress = e => {
        switch(e.key) {
            case 'Enter':
                return
            case 'Escape':
                return this.props.showModalByKey()
            default:
        }
    }

    _renderModal(key) {
        switch(key) {
            case modalType.deleteRole:
                return <DeleteRole/>
            case modalType.addNewStory:
                return <AddNewStory/>
            case modalType.addNewField:
                return <AddNewField/>
            case modalType.deleteStory:
                return <DeleteStory/>
            case modalType.addNewPhase:
                return <AddNewPhase/>
            case modalType.addFlowStory:
                return <AddFlowStory/>

            case modalType.showPage:
                return <PageModal/>
            default:
                return null
        }
    }

    _onClose = (e) => {
        let origin = e.srcElement || e.target
        if (origin.className === 'modal') {
            this.props.showModalByKey()
        }
    }

    render() {
        const { modalKey } = this.props
        if (!modalKey) return null
        
        return (
            <div className="modal" onClick={this._onClose}>
                <div className="modal-child">
                    {this._renderModal(modalKey)}
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        modalKey: state.modal.modalKey,
    }),
    {
        showModalByKey,
    }
)(ModalView)