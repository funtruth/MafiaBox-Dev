import React from 'react'

import { modalType } from './types'

import FunctionPageModal from './components/FunctionPageModal';

import EditAccount from './account/EditAccount'
import CreateProject from './account/CreateProject';

import AddNewStory from './keys/AddNewStory'
import AddNewField from './keys/AddNewField'
import DeletePage from './keys/DeletePage';
import DeleteStory from './keys/DeleteStory';
import PageModal from './keys/PageModal';
import ModalCodeView from './components/ModalCodeView'

import DialogSave from './dialogs/DialogSave';
import DeleteLogic from './dialogs/DeleteLogic'

import EditLogic from './page/EditLogic';
import PublishWithSource from './page/PublishWithSource';

import EditTrigger from './trigger/EditTrigger'
import EditPriority from './priority/EditPriority'
import RemovePriorityRow from './priority/RemovePriorityRow'
import PickCharImage from './image/PickCharImage'

//StringViews
import EditEvent from './strings/EditEvent'
import EditToast from './strings/EditToast'

//NumberViews
import AssignNumber from './vars/AssignNumber'
import EditNumber from './vars/EditNumber'


export default function ModalKeys(props) {
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
            return <PageModal {...props}/>
        case modalType.showFunctionPage:
            return <FunctionPageModal {...props}/>
        
        case modalType.saveChanges:
            return <DialogSave {...props}/>
        case modalType.deleteLogic:
            return <DeleteLogic {...props}/>

        case modalType.editLogic:
            return <EditLogic {...props}/>
        case modalType.publishWithSource:
            return <PublishWithSource {...props}/>

        case modalType.editTrigger:
            return <EditTrigger {...props}/>
        case modalType.editPriority:    
            return <EditPriority {...props}/>
        case modalType.removePriorityRow:
            return <RemovePriorityRow {...props}/>
        case modalType.pickCharacterImage:
            return <PickCharImage {...props}/>
        
        //StringViews
        case modalType.editEvent:
            return <EditEvent {...props}/>
        case modalType.editToast:
            return <EditToast {...props}/>
        
        //NumberViews
        case modalType.assignNumber:
            return <AssignNumber {...props}/>
        case modalType.editNumber:
            return <EditNumber {...props}/>

        default:
            return null
    }
}