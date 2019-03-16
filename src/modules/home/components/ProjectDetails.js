import React, { useEffect } from 'react'
import firebase from 'firebase/app'
import './Project.css'

import { dropdownType } from '../../dropdown/types'

import ProjectNewItem from './ProjectNewItem';
import ProjectItem from './ProjectItem';

export default function ProjectDetails(props) {
    const { activeProject, projects } = props

    useEffect(() => {
        if (!activeProject) return;

        const projectRef = firebase.database().ref(`projects/${activeProject}`)
        projectRef.on('value', snap => props.projectListener(snap))

        return () => {
            console.log(`turn off listener at ${activeProject}`)
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