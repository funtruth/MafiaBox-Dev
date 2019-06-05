import React, { useEffect } from 'react'
import firebase from 'firebase/app'
import './Project.css'
import { connect, useSelector } from 'react-redux'

import { dropdownType } from '../../dropdown/types'

import { projectListener } from '../../firebase/FirebaseReducer'
import {
    receiveValue,
    receiveEvent,
    receiveDeleteEvent,
    VALID_PROPS,
    PROP_LISTENERS,
    LISTENER_TYPE,
} from '../../page/PageReducer'

import ProjectNewItem from './ProjectNewItem';
import ProjectItem from './ProjectItem';

import { DropClick } from '../../components/Common';

function ProjectDetails(props) {
    const projects = useSelector(state => state.firebase.projects)
    const { activeProject } = props

    useEffect(() => {
        if (!activeProject) return;

        let listeners = []
        VALID_PROPS.forEach(key => {
            const ref = firebase.database().ref(`dev/${activeProject}/${key}`)
            switch(PROP_LISTENERS[key]) {
                case LISTENER_TYPE.value:
                    ref.on('value', snap => props.receiveValue(snap, key))
                    break
                case LISTENER_TYPE.children:
                    ref.on('child_added', snap => props.receiveEvent(snap, key))
                    ref.on('child_changed', snap => props.receiveEvent(snap, key))
                    ref.on('child_removed', snap => props.receiveDeleteEvent(snap, key))
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
    }, [activeProject])

    if (!!activeProject) return (
        <DropClick
            dropdown={dropdownType.pickProject}
            place="right"
        >
            <ProjectItem project={projects[activeProject]}/>
        </DropClick>
    )

    return <ProjectNewItem/>
}

export default connect(
    null,
    {
        receiveValue,
        receiveEvent,
        receiveDeleteEvent,
    }
)(ProjectDetails)