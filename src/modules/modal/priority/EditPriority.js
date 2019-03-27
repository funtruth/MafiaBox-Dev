import React from 'react'
import './EditPriority.css'
import _ from 'lodash'
import { connect } from 'react-redux'

import { diffPriorities } from '../../page/PageReducer'

import {
    Header,
} from '../../components/Common'

import ModalOptions from '../components/ModalOptions'
import ModalCheckSave from '../components/ModalCheckSave';
import PriorityList from './components/PriorityList'

function EditPriority(props) {
    const { attach, pageKey } = props
    const workspace = attach
    
    const mainProps = {
        pageKey,
        workspace,
        setWorkspace: props.setWorkspace,
    }

    let handleSave = () => {
        props.diffPriorities(workspace)
        props.popModalBy(1)
    }

    const onSortEnd = ({oldIndex, newIndex}) => {
        if (oldIndex === newIndex) return;
        
        let workspaceClone = _.cloneDeep(workspace)

        const [removed] = workspaceClone.splice(oldIndex, 1)
        workspaceClone.splice(newIndex, 0, removed)

        props.setWorkspace(workspaceClone)
    }
    
    return (
        <ModalCheckSave {...props} handleSave={handleSave}>
            <div
                cancel-appclick="true"
                style={{
                    minWidth: 600,
                    width: '75vw',
                }}
            >
                <Header text="Edit Priority"></Header>
                <PriorityList
                    {...mainProps}
                    items={workspace}
                    onSortEnd={onSortEnd}
                    transitionDuration={300}
                    distance={2}
                    useDragHandle={true}
                />
                <ModalOptions onSave={handleSave} onClose={props.close}/>
            </div>
        </ModalCheckSave>
    )
}

export default connect(
    null,
    {
        diffPriorities,
    }
)(EditPriority)