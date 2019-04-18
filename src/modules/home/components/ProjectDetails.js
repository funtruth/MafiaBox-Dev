import React, { useEffect } from 'react'
import firebase from 'firebase/app'
import './Project.css'
import { connect } from 'react-redux'

import { dropdownType } from '../../dropdown/types'

import { projectListener } from '../../firebase/FirebaseReducer'
import { receiveEvent, receiveDeleteEvent } from '../../page/PageReducer'

import ProjectNewItem from './ProjectNewItem';
import ProjectItem from './ProjectItem';

import { DropClick } from '../../components/Common';

function ProjectDetails(props) {
    const { activeProject, projects } = props

    useEffect(() => {
        if (!activeProject) return;

        const projectRef = firebase.database().ref(`projects/${activeProject}`)
        projectRef.on('value', snap => props.projectListener(snap))

        const pageRepoRef   = firebase.database().ref(`dev/${activeProject}/pageRepo`)
        pageRepoRef.on('child_added', snap => props.receiveEvent(snap, 'pageRepo'))
        pageRepoRef.on('child_changed', snap => props.receiveEvent(snap, 'pageRepo'))
        pageRepoRef.on('child_removed', snap => props.receiveDeleteEvent(snap, 'pageRepo'))
        
        const pageMapRef    = firebase.database().ref(`dev/${activeProject}/pageMap`)
        pageMapRef.on('child_added', snap => props.receiveEvent(snap, 'pageMap'))
        pageMapRef.on('child_changed', snap => props.receiveEvent(snap, 'pageMap'))
        pageMapRef.on('child_removed', snap => props.receiveDeleteEvent(snap, 'pageMap'))

        const storyRepoRef  = firebase.database().ref(`dev/${activeProject}/storyRepo`)
        storyRepoRef.on('child_added', snap => props.receiveEvent(snap, 'storyRepo'))
        storyRepoRef.on('child_changed', snap => props.receiveEvent(snap, 'storyRepo'))
        storyRepoRef.on('child_removed', snap => props.receiveDeleteEvent(snap, 'storyRepo'))

        const storyMapRef   = firebase.database().ref(`dev/${activeProject}/storyMap`)
        storyMapRef.on('child_added', snap => props.receiveEvent(snap, 'storyMap'))
        storyMapRef.on('child_changed', snap => props.receiveEvent(snap, 'storyMap'))
        storyMapRef.on('child_removed', snap => props.receiveDeleteEvent(snap, 'storyMap'))
        
        const fieldRepoRef  = firebase.database().ref(`dev/${activeProject}/fieldRepo`)
        fieldRepoRef.on('child_added', snap => props.receiveEvent(snap, 'fieldRepo'))
        fieldRepoRef.on('child_changed', snap => props.receiveEvent(snap, 'fieldRepo'))
        fieldRepoRef.on('child_removed', snap => props.receiveDeleteEvent(snap, 'fieldRepo'))

        const fieldMapRef   = firebase.database().ref(`dev/${activeProject}/fieldMap`)
        fieldMapRef.on('child_added', snap => props.receiveEvent(snap, 'fieldMap'))
        fieldMapRef.on('child_changed', snap => props.receiveEvent(snap, 'fieldMap'))
        fieldMapRef.on('child_removed', snap => props.receiveDeleteEvent(snap, 'fieldMap'))

        const globalVarsRef = firebase.database().ref(`dev/${activeProject}/globalVars`)
        globalVarsRef.on('child_added', snap => props.receiveEvent(snap, 'globalVars'))
        globalVarsRef.on('child_changed', snap => props.receiveEvent(snap, 'globalVars'))
        globalVarsRef.on('child_removed', snap => props.receiveDeleteEvent(snap, 'globalVars'))

        return () => {
            console.log('Turning off listeners at', activeProject)
            if (projectRef)     projectRef.off();
            if (pageRepoRef)    pageRepoRef.off();
            if (pageMapRef)     pageMapRef.off();
            if (storyRepoRef)   storyRepoRef.off();
            if (storyMapRef)    storyMapRef.off();
            if (fieldRepoRef)   fieldRepoRef.off();
            if (fieldMapRef)    fieldMapRef.off();
            if (globalVarsRef)  globalVarsRef.off();
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
        projectListener,
        receiveEvent,
        receiveDeleteEvent,
    }
)(ProjectDetails)