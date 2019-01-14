import React from 'react'
import './modals.css'
import { connect } from 'react-redux'

import { showModal } from './ModalReducer'

import { modalType } from './types'

import Modal from './components/Modal';

import DeleteRole from './keys/DeleteRole';
import AddNewStory from './keys/AddNewStory'
import AddNewField from './keys/AddNewField'
import DeleteStory from './keys/DeleteStory';
import PageModal from './keys/PageModal';
import TemplateModal from './keys/TemplateModal'

import EditTrigger from './trigger/EditTrigger'

class ModalView extends React.Component {
    _renderItem(item, index) {
        switch(item.key) {
            case modalType.deleteRole:
                return <DeleteRole {...item}/>
            case modalType.addNewStory:
                return <AddNewStory {...item}/>
            case modalType.addNewField:
                return <AddNewField {...item}/>
            case modalType.deleteStory:
                return <DeleteStory {...item}/>

            case modalType.showPage:
                return <PageModal {...item}/>
            case modalType.showTemplate:
                return <TemplateModal {...item}/>
            
            case modalType.editTrigger:
                return <EditTrigger {...item}/>
            default:
                return null
        }
    }

    render() {
        const { modalKeys } = this.props
        if (!modalKeys.length) return null
        
        return (
            modalKeys.map((item, index) => {
                return (
                    <Modal {...item} key={index}>
                        {this._renderItem(item, index)}
                    </Modal>
                )
            })
        )
    }
}

export default connect(
    state => ({
        modalKeys: state.modal.modalKeys,
    }),
    {
        showModal,
    }
)(ModalView)