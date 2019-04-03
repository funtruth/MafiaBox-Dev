import React from 'react'
import './modals.css'
import { connect } from 'react-redux'

import { showModal, popModalTo, updateTopModal } from './ModalReducer'
import { updateRepo } from '../page/PageReducer'
import { updateFunction } from '../functions/FunctionReducer'

import { modalType } from './types'
import { updateSourceType } from '../common/types'

import FunctionPageModal from './components/FunctionPageModal';

import EditAccount from './account/EditAccount'
import CreateProject from './account/CreateProject';

import AddNewStory from './keys/AddNewStory'
import AddNewField from './keys/AddNewField'
import DeletePage from './keys/DeletePage';
import DeleteStory from './keys/DeleteStory';
import PageModal from './keys/PageModal';
import TemplateModal from './keys/TemplateModal'
import ModalCodeView from './components/ModalCodeView'

import DialogSave from './dialogs/DialogSave';
import DeleteLogic from './dialogs/DeleteLogic'

import EditTrigger from './trigger/EditTrigger'
import EditEvent from './event/EditEvent'
import EditToast from './toast/EditToast'
import EditPriority from './priority/EditPriority'
import RemovePriorityRow from './priority/RemovePriorityRow'
import AssignVarModal from './vars/AssignVarModal'
import EditString from './string/EditString'
import PickCharImage from './image/PickCharImage'

class ModalView extends React.Component {
    _renderItem(props) {
        props.showModal = this.props.showModal

        switch(props.key) {
            case modalType.addNewStory:
                return <AddNewStory {...props}/>
            case modalType.addNewField:
                return <AddNewField {...props}/>
            case modalType.deletePage:
                return <DeletePage {...props}/>
            case modalType.deleteStory:
                return <DeleteStory {...props}/>

            case modalType.editAccount:
                return <EditAccount {...props}/>
            case modalType.createProject:
                return <CreateProject {...props}/>

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
            case modalType.deleteLogic:
                return <DeleteLogic {...props}/>

            case modalType.editTrigger:
                return <EditTrigger {...props}/>
            case modalType.editEvent:
                return <EditEvent {...props}/>
            case modalType.editToast:
                return <EditToast {...props}/>
            case modalType.editPriority:    
                return <EditPriority {...props}/>
            case modalType.removePriorityRow:
                return <RemovePriorityRow {...props}/>
            case modalType.assignVar:
                return <AssignVarModal {...props}/>
            case modalType.editString:
                return <EditString {...props}/>
            case modalType.pickCharacterImage:
                return <PickCharImage {...props}/>
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

                props.setWorkspace = (value, path) => this.props.updateTopModal(path || ['attach'], value)
                switch(props.updateSource) {
                    case updateSourceType.repo:
                        props.updatePage = (path, value) => this.props.updateRepo(path, value)
                        break
                    case updateSourceType.function:
                        props.updatePage = (path, value) => this.props.updateFunction(path, value)
                        break
                    case updateSourceType.topModal:
                        props.updatePage = (path, value) => this.props.updateTopModal(path, value)
                        break
                    default:
                        props.updatePage = () => console.warn('updatePage is not set up for this Modal.')
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
        popModalTo,
        updateTopModal,
    }
)(ModalView)