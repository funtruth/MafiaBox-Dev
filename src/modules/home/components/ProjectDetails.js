import React from 'react'

import { dropdownType } from '../../dropdown/types'

import ProjectNewItem from './ProjectNewItem';

export default function ProjectDetails(props) {
    const { activeProject } = props

    if (!activeProject) return (
        <div className="project-details">
            <ProjectNewItem/>
        </div>
    )

    return (
        <div
            className="project-details app-onclick"
            menu-type={dropdownType.pickProject}
        >
            {activeProject && <div></div>}
        </div>
    )
}