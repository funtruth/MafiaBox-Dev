import React from 'react'
import './modals.css'
import { connect } from 'react-redux'

import { showModal, popModalTo } from './ModalReducer'
import { updatePageByPath } from '../page/PageReducer'

import { modalType } from './types'
import { updateViewType } from '../logic/types'

import Modal from './components/Modal';

import DeleteRole from './keys/DeleteRole';
import AddNewStory from './keys/AddNewStory'
import AddNewField from './keys/AddNewField'
import DeleteStory from './keys/DeleteStory';
import PageModal from './keys/PageModal';
import TemplateModal from './keys/TemplateModal'

import EditTrigger from './update/EditTrigger'
import SaveChanges from './components/SaveChanges';

class ModalView extends React.Component {
    _renderItem(props) {
        props.showModal = this.props.showModal

        switch(props.key) {
            case modalType.deleteRole:
                return <DeleteRole {...props}/>
            case modalType.addNewStory:
                return <AddNewStory {...props}/>
            case modalType.addNewField:
                return <AddNewField {...props}/>
            case modalType.deleteStory:
                return <DeleteStory {...props}/>

            case modalType.showPage:
                return <PageModal {...props}/>
            case modalType.showTemplate:
                return <TemplateModal {...props}/>
            
            case modalType.editTrigger:
                return <EditTrigger {...props}/>
            case modalType.saveChanges:
                return <SaveChanges {...props}/>
            default:
                return null
        }
    }

    render() {
        const { modalKeys } = this.props
        if (!modalKeys.length) return null
        
        return (
            modalKeys.map((item, index) => {
                item.popModalBy = (pops) => this.props.popModalTo(index - pops) 

                switch(item.key) {
                    case modalType.editTrigger:
                        item.requireSave = true
                        item.onSave = () => this.props.updatePageByPath(
                            item.pageKey,
                            item.fieldKey,
                            item.indexKey,
                            'data',
                            item.subfieldKey,
                            {
                                ...item.attach,
                                updateViewType: updateViewType.trigger,
                            },
                        )
                        item.onClose = () => this.props.showModal(modalType.saveChanges, {
                            onSave: item.onSave,
                            onClose: this.props.showModal,
                        })
                        break
                    default:
                }

                return (
                    <Modal {...item} key={index}>
                        {this._renderItem(item)}
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
        updatePageByPath,
        popModalTo,
    }
)(ModalView)