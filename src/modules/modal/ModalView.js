import React from 'react'
import './modals.css'
import { connect } from 'react-redux'

import { showModal, popModalTo, updateTopModal } from './ModalReducer'
import { updateRepo, saveAllPriorities } from '../page/PageReducer'
import { updateFunction } from '../functions/FunctionReducer'

import { modalType } from './types'
import { updateSourceType } from '../common/types'
import { updateViewType } from '../logic/types'

import FunctionPageModal from './components/FunctionPageModal';

import DeleteRole from './keys/DeleteRole';
import AddNewStory from './keys/AddNewStory'
import AddNewField from './keys/AddNewField'
import DeleteStory from './keys/DeleteStory';
import PageModal from './keys/PageModal';
import TemplateModal from './keys/TemplateModal'
import ModalCodeView from './components/ModalCodeView'

import DialogSave from './dialogs/DialogSave';

import EditTrigger from './trigger/EditTrigger'
import EditEvent from './event/EditEvent'
import EditToast from './toast/EditToast'
import EditPriority from './priority/EditPriority'
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

            case modalType.showCode:
                return <ModalCodeView {...props}/>
            case modalType.showPage:
                return <PageModal {...props} location={this.props.location}/>
            case modalType.showTemplate:
                return <TemplateModal {...props}/>
            case modalType.showFunctionPage:
                return <FunctionPageModal {...props} location={this.props.location}/>
            
            case modalType.saveChanges:
                return <DialogSave {...props}/>

            case modalType.editTrigger:
                return <EditTrigger {...props}/>
            case modalType.editEvent:
                return <EditEvent {...props}/>
            case modalType.editToast:
                return <EditToast {...props}/>
            case modalType.editPriority:    
                return <EditPriority {...props}/>
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
                props.close = () => this.props.popModalTo(index - 1)

                props.setWorkspace = (value) => this.props.updateTopModal(['attach'], value)
                switch(props.updateSource) {
                    case updateSourceType.repo:
                        props.updatePage = (value) => {
                            if (props.ignoreSubpath) {
                                this.props.updateRepo(props.path, value)
                            } else {
                                this.props.updateRepo(props.path, value, props.subpath)
                            }
                        }
                        break
                    case updateSourceType.function:
                        props.updatePage = (value) => {
                            if (props.ignoreSubpath) {
                                this.props.updateFunction(props.path, value)
                            } else {
                                this.props.updateFunction(props.path, value, props.subpath)
                            }
                        }
                        break
                    case updateSourceType.topModal:
                        props.updatePage = (value) => {
                            if (props.ignoreSubpath) {
                                this.props.updateTopModal(props.path, value)
                            } else {
                                this.props.updateTopModal(props.path, value, props.subpath)
                            }
                        }
                        break
                    default:
                        props.updatePage = () => console.warn('updatePage is not set up for this Dropdown.')
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
                    default:
                }
                
                return this._renderItem(props)
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