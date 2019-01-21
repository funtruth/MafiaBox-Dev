import React from 'react'
import './modals.css'
import { connect } from 'react-redux'

import { showModal, popModalTo, updateTopModal } from './ModalReducer'
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
import EditEvent from './update/EditEvent'
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
            case modalType.editEvent:
                return <EditEvent {...props}/>
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
                let props = Object.assign({}, item)

                props.popModalBy = (pops) => this.props.popModalTo(index - pops) 

                switch(props.key) {
                    case modalType.editTrigger:
                    case modalType.editEvent:
                        props.requireSave = true
                        break
                    default:
                }

                switch(props.key) {
                    case modalType.editTrigger:
                        props.onSave = () => this.props.updatePageByPath(
                            props.pageKey,
                            props.fieldKey,
                            props.indexKey,
                            'data',
                            props.subfieldKey,
                            {
                                ...props.attach,
                                updateViewType: updateViewType.trigger,
                            },
                        )
                        props.onClose = () => this.props.showModal(modalType.saveChanges, {
                            onSave: props.onSave,
                            onClose: this.props.showModal,
                        })
                        break
                    case modalType.editEvent:
                        props.onSave = () => this.props.updatePageByPath(
                            props.pageKey,
                            props.fieldKey,
                            props.indexKey,
                            'data',
                            props.subfieldKey,
                            {
                                ...props.attach,
                                updateViewType: updateViewType.events,
                            }
                        )
                        props.onAttach = () => this.props.updateTopModal(
                            'attach',
                            'value',
                            props.subfieldKey,
                            {
                                ...props.attach,
                                updateViewType: updateViewType.events,
                            }
                        )
                        props.onEdit = (stringKey, value) => this.props.updateTopModal(
                            'attach',
                            'value',
                            stringKey,
                            value,
                        )
                        props.onClose = () => this.props.showModal(modalType.saveChanges, {
                            onSave: props.onSave,
                            onClose: this.props.showModal,
                        })
                        break
                    default:
                }

                return (
                    <Modal {...props} key={index}>
                        {this._renderItem(props)}
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
        updateTopModal,
    }
)(ModalView)