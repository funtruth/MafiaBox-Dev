import React, { useEffect } from 'react'
import firebase from 'firebase/app'
import './Project.css'
import { connect } from 'react-redux'

import { dropdownType } from '../../dropdown/types'

import { projectListener } from '../../firebase/FirebaseReducer'
import { receiveEvent, receiveDeleteEvent } from '../../page/PageReducer'

import ProjectNewItem from './ProjectNewItem';
import ProjectItem from './ProjectItem';

function ProjectDetails(props) {
    const { activeProject, projects } = props

    useEffect(() => {
        if (!activeProject) return;

        const projectRef = firebase.database().ref(`projects/${activeProject}`)
        projectRef.on('value', snap => props.projectListener(snap))

        const pageRepoRef   = firebase.database().ref(`dev/${activeProject}/pageRepo`)
        const pageMapRef    = firebase.database().ref(`dev/${activeProject}/pageMap`)
        const storyRepoRef  = firebase.database().ref(`dev/${activeProject}/storyRepo`)
        const storyMapRef   = firebase.database().ref(`dev/${activeProject}/storyMap`)

        pageRepoRef.on('child_added', snap => props.receiveEvent(snap, 'pageRepo'))
        pageRepoRef.on('child_changed', snap => props.receiveEvent(snap, 'pageRepo'))
        pageRepoRef.on('child_removed', snap => props.receiveDeleteEvent(snap, 'pageRepo'))
        
        pageMapRef.on('child_added', snap => props.receiveEvent(snap, 'pageMap'))
        pageMapRef.on('child_changed', snap => props.receiveEvent(snap, 'pageMap'))
        pageMapRef.on('child_removed', snap => props.receiveDeleteEvent(snap, 'pageMap'))

        storyRepoRef.on('child_added', snap => props.receiveEvent(snap, 'storyRepo'))
        storyRepoRef.on('child_changed', snap => props.receiveEvent(snap, 'storyRepo'))
        storyRepoRef.on('child_removed', snap => props.receiveDeleteEvent(snap, 'storyRepo'))

        storyMapRef.on('child_added', snap => props.receiveEvent(snap, 'storyMap'))
        storyMapRef.on('child_changed', snap => props.receiveEvent(snap, 'storyMap'))
        storyMapRef.on('child_removed', snap => props.receiveDeleteEvent(snap, 'storyMap'))

        return () => {
            console.log('Turning off listeners at', activeProject)
            if (projectRef)     projectRef.off();
            if (pageRepoRef)    pageRepoRef.off();
            if (pageMapRef)     pageMapRef.off();
            if (storyRepoRef)   storyRepoRef.off();
            if (storyMapRef)    storyMapRef.off();
        }
    }, [activeProject])

    if (!!activeProject) return (
        <div
            className="app-onclick"
            highlight="true"
            menu-type={dropdownType.pickProject}
            place="right"
        >
            <ProjectItem project={projects[activeProject]}/>
        </div>
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