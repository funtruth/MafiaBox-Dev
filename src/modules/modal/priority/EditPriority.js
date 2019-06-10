import React, { useState } from 'react'
import './EditPriority.css'
import _ from 'lodash'
import { connect } from 'react-redux'

import { diffPriorities } from '../../page/PageReducer'
import {
    setPref,
    PREF_KEY,
} from '../../app/AppReducer'

import {
    Header,
    Switch,
    Text,
} from '../../components/Common'

import ModalOptions from '../components/ModalOptions'
import PriorityList from './components/PriorityList'

function EditPriority(props) {
    const { attach, pageKey, pageRepo, prefs } = props

    //const [controlRepo] = useState(_.cloneDeep(attach))
    const [storyKey] = useState(pageRepo[pageKey].storyType)
    
    const workspace = attach
    
    const mainProps = {
        pageKey,
        storyKey,
        workspace,
        setWorkspace: props.setWorkspace,
    }

    let handleSave = () => {
        props.diffPriorities(workspace)
    }

    const onSortEnd = ({oldIndex, newIndex}) => {
        if (oldIndex === newIndex) return;
        
        let workspaceClone = _.cloneDeep(workspace)

        const [removed] = workspaceClone.splice(oldIndex, 1)
        workspaceClone.splice(newIndex, 0, removed)

        props.setWorkspace(workspaceClone)
    }

    const prefValue = prefs[PREF_KEY.EDIT_PRIO_SWITCH]
    const [switched, setSwitched] = useState(prefValue || false)
    const handleSwitch = () => {
        setSwitched(!switched)
        props.setPref(PREF_KEY.EDIT_PRIO_SWITCH, !switched)
    }
    
    return (
        <div
            style={{
                minWidth: 600,
                width: '75vw',
            }}
        >
            <Header text="Edit Priority" onClose={props.close}>
            </Header>
            <PriorityList
                {...mainProps}
                switched={switched}
                onSortEnd={onSortEnd}
                transitionDuration={300}
                distance={2}
                useDragHandle={true}
            />
            <ModalOptions onSave={handleSave} onClose={props.close}>
                <Switch switched={switched} onChange={handleSwitch}/>
                <Text size="m" color="grey" align="c" style={{marginLeft: 12, marginRight: 'auto'}}>
                    Show roles from all patches
                </Text>
            </ModalOptions>
        </div>
    )
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
        prefs: state.app.prefs,
    }),
    {
        diffPriorities,
        setPref,
    }
)(EditPriority)