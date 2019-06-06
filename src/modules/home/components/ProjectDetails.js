import React, { useEffect } from 'react'
import firebase from 'firebase/app'
import './Project.css'
import { useSelector, useDispatch } from 'react-redux'

import { dropdownType } from '../../dropdown/types'

import {
    receiveValue,
    receiveEvent,
    receiveDeleteEvent,
    VALID_PROPS,
    PROP_LISTENERS,
    LISTENER_TYPE,
} from '../../page/PageReducer'

import ProjectItem from './ProjectItem';
import { DropClick, Tag } from '../../components/Common';
import { modalType } from '../../modal/types';

export default function ProjectDetails(props) {
    const dispatch = useDispatch();
    const projectUsers = useSelector(state => state.firebase.projectUsers);
    
    const { activeProject } = props

    useEffect(() => {
        if (!activeProject) return;

        let listeners = []
        VALID_PROPS.forEach(key => {
            const ref = firebase.database().ref(`dev/${activeProject}/${key}`)
            switch(PROP_LISTENERS[key]) {
                case LISTENER_TYPE.value:
                    ref.on('value', snap => dispatch(receiveValue(snap, key)))
                    break
                case LISTENER_TYPE.children:
                    ref.on('child_added', snap => dispatch(receiveEvent(snap, key)))
                    ref.on('child_changed', snap => dispatch(receiveEvent(snap, key)))
                    ref.on('child_removed', snap => dispatch(receiveDeleteEvent(snap, key)))
                    break
                default:
                    console.warn('invalid listener type.')
            }
            listeners.push(ref)
        })

        return () => {
            console.log('Turning off listeners at', activeProject)
            listeners.forEach(ref => ref && ref.off())
        }
    }, [activeProject, dispatch])

    if (!!activeProject) return (
        <DropClick
            dropdown={dropdownType.pickProject}
            place="right"
        >
            <ProjectItem project={projectUsers[activeProject]}/>
        </DropClick>
    )

    return (
        <DropClick modal={modalType.createProject}>
            <Tag
                icon="plus"
                text="New project"
            />
        </DropClick>
    )
}