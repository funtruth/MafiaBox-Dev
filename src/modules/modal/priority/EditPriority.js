import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './EditPriority.css'
import _ from 'lodash'

import {
    setPref,
    PREF_KEY,
} from '../../app/AppReducer'

import {
    Switch,
    Text,
    Body,
} from '../../components/Common'

import ModalOptions from '../components/ModalOptions'
import PriorityList from './components/PriorityList'
import { boardType } from '../../fields/types';

export default function EditPriority(props) {
    const dispatch = useDispatch()
    const { prefs } = useSelector(state => state.app)
    const { pageRepo } = useSelector(state => state.page)
    const groupedRoles = _(pageRepo).filter(i => i.board === boardType.roles.key).groupBy(i => i.priority).value()

    const onSortEnd = ({oldIndex, newIndex}) => {
        if (oldIndex === newIndex) return;
        
        let workspaceClone = []

        const [removed] = workspaceClone.splice(oldIndex, 1)
        workspaceClone.splice(newIndex, 0, removed)

        props.setWorkspace(workspaceClone)
    }

    const prefValue = prefs[PREF_KEY.EDIT_PRIO_SWITCH]
    const [switched, setSwitched] = useState(prefValue || false)
    const handleSwitch = () => {
        setSwitched(!switched)
        dispatch(setPref(PREF_KEY.EDIT_PRIO_SWITCH, !switched))
    }

    return (
        <Body
            style={{
                height: 600,
                width: '75vw',
            }}
        >
            <Text>Edit priority</Text>
            <PriorityList
                groupedRoles={groupedRoles}
                switched={switched}
                onSortEnd={onSortEnd}
                transitionDuration={300}
                distance={2}
                useDragHandle={true}
            />
            <ModalOptions>
                <Switch switched={switched} onChange={handleSwitch}/>
                <Text size="m" color="grey" align="c" style={{marginLeft: 12, marginRight: 'auto'}}>
                    Show roles from all patches
                </Text>
            </ModalOptions>
        </Body>
    )
}