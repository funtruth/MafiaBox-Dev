import React from 'react'
import './modals.css'
import _ from 'lodash'
import { connect } from 'react-redux'

import { showModal, popModalTo, updateTopModal } from './ModalReducer'
import { updateRepo, saveAllPriorities } from '../page/PageReducer'
import { updateFunction } from '../functions/FunctionReducer'

import { modalType } from './types'
import { updateViewType } from '../logic/types'

import Modal from './components/Modal';
import FunctionPageModal from './components/FunctionPageModal';

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
import EditVarDetails from './vars/EditVarDetails'
import AssignVarModal from './vars/AssignVarModal'

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
            case modalType.showFunctionPage:
                return <FunctionPageModal {...props} location={this.props.location}/>
            
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
            case modalType.editVar:
                return <EditVarDetails {...props}/>
            case modalType.assignVar:
                return <AssignVarModal {...props}/>
            default:
                return null
        }
    }

    render() {
        const { modalKeys } = this.props
        
        return (
            modalKeys.map((item, index) => {
                let props = Object.assign({}, item)

                props.popModalBy = (pops) => this.props.popModalTo(index - pops) 

                switch(props.key) {
                    case modalType.showPage:
                        props.updatePage = (fieldKey, value) => this.props.updateRepo(
                            [props.pageKey, fieldKey],
                            value,
                        )
                        break
                    case modalType.showFunctionPage:
                        props.updatePage = (fieldKey, value) => this.props.updateFunction(
                            [props.pageKey, fieldKey],
                            value,
                        )
                        break
                    default:
                }

                switch(props.key) {
                    case modalType.editTrigger:
                        props.onSave = () => this.props.updateRepo(
                            [props.pageKey, props.fieldKey, props.indexKey, 'data', props.subfieldKey],
                            {
                                ...props.attach,
                                updateViewType: updateViewType.trigger,
                            },
                        )
                        break
                    case modalType.editEvent:
                        props.onSave = () => this.props.updateRepo(
                            [props.pageKey, props.fieldKey, props.indexKey, 'data', props.subfieldKey],
                            {
                                ...props.attach,
                                updateViewType: updateViewType.events,
                            }
                        )
                        props.onAttach = () => this.props.updateTopModal(
                            ['attach', 'value', props.subfieldKey],
                            {
                                ...props.attach,
                                updateViewType: updateViewType.events,
                            }
                        )
                        props.onEdit = (stringKey, value) => this.props.updateTopModal(
                            ['attach', 'value', stringKey],
                            value,
                        )
                        break
                    case modalType.editToast:
                        props.onSave = () => this.props.updateRepo(
                            [props.pageKey, props.fieldKey, props.indexKey, 'data'],
                            {
                                ...props.attach,
                                key: 'toast',
                            },
                        )
                        props.onEdit = (value) => this.props.updateTopModal(
                            ['attach'],
                            value,
                        )
                        break
                    case modalType.editPriority:
                        props.onSave = () => this.props.saveAllPriorities(props.attach)
                        break
                    case modalType.assignVar: //TODO WIP
                        props.onSave = (value) => this.props.updateRepo(props.path, value, props.subpath)
                        break
                    default:
                }

                switch(props.key) {
                    case modalType.editTrigger:
                    case modalType.editEvent:
                    case modalType.editToast:
                    case modalType.editPriority:
                    case modalType.assignVar:
                        props.showSaveDialogue = true
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
        updateRepo,
        updateFunction,
        saveAllPriorities,
        popModalTo,
        updateTopModal,
    }
)(ModalView)