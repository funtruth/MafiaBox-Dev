import React from 'react'

import { modalType } from './types'

import CreateProject from './account/CreateProject';
import EditLogic from './page/EditLogic';
import EditPriority from './priority/EditPriority'
import EditTrigger from './logic/EditTrigger'
import DeleteLogic from './dialogs/DeleteLogic'
import DeletePage from './keys/DeletePage';
import DeleteStory from './keys/DeleteStory';
import ModalCodeView from './components/ModalCodeView'
import PageModal from './keys/PageModal';
import PickSprite from './roles/PickSprite'
import PublishWithSource from './page/PublishWithSource';
import RemovePriorityRow from './priority/RemovePriorityRow'

//StringViews
import EditString from './strings/EditString'
import EditEvent from './strings/EditEvent'
import EditToast from './strings/EditToast'

//NumberViews
import EditNumber from './logic/EditNumber'

export default function ModalKeys(props) {
    switch(props.key) {
        case modalType.deletePage:
            return <DeletePage {...props}/>
        case modalType.deleteStory:
            return <DeleteStory {...props}/>
        case modalType.createProject:
            return <CreateProject {...props}/>
        case modalType.showCode:
            return <ModalCodeView {...props}/>
        case modalType.showPage:
            return <PageModal {...props}/>
        case modalType.deleteLogic:
            return <DeleteLogic {...props}/>
        case modalType.publishWithSource:
            return <PublishWithSource {...props}/>
        case modalType.editPriority:    
            return <EditPriority {...props}/>
        case modalType.removePriorityRow:
            return <RemovePriorityRow {...props}/>
        case modalType.pickSprite:
            return <PickSprite {...props}/>
        //LogicViews
        case modalType.editLogic:
            return <EditLogic {...props}/>
        case modalType.editTrigger:
            return <EditTrigger {...props}/>
        //StringViews
        case modalType.editString:
            return <EditString {...props}/>
        case modalType.editEvent:
            return <EditEvent {...props}/>
        case modalType.editToast:
            return <EditToast {...props}/>
        //NumberViews
        case modalType.editNumber:
            return <EditNumber {...props}/>

        default:
            return null
    }
}