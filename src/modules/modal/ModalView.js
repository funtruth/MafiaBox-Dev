import React from 'react'
import './modals.css'
import _ from 'lodash'
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

import SaveChanges from './components/SaveChanges';
import EditTrigger from './update/EditTrigger'
import EditEvent from './update/EditEvent'
import EditToast from './return/EditToast'
import EditPriority from './update/EditPriority'

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
                return <PageModal {...props} location={this.props.location}/>
            case modalType.showTemplate:
                return <TemplateModal {...props}/>
            
            case modalType.saveChanges:
                return <SaveChanges {...props}/>
            case modalType.editTrigger:
                return <EditTrigger {...props}/>
            case modalType.editEvent:
                return <EditEvent {...props}/>
            case modalType.editToast:
                return <EditToast {...props}/>
            case modalType.editPriority:    
                return <EditPriority {...props}/>
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
                        break
                    case modalType.editToast:
                        props.onSave = () => this.props.updatePageByPath(
                            props.pageKey,
                            props.fieldKey,
                            props.indexKey,
                            'data',
                            {
                                ...props.attach,
                                key: 'toast',
                            },
                        )
                        props.onEdit = (value) => this.props.updateTopModal(
                            'attach',
                            value,
                        )
                        break
                    default:
                }

                if (props._attach) {
                    props.onClose = () => {
                        if (_.isEqual(props.attach, props._attach)) {
                            this.props.popModalTo(index - 1) 
                        } else {
                            this.props.showModal(modalType.saveChanges, {
                                onSave: props.onSave,
                                onClose: this.props.showModal,
                            })
                        }
                    }
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