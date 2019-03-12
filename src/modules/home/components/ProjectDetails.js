import React from 'react'

import { dropdownType } from '../../dropdown/types'

import ProjectNewItem from './ProjectNewItem';

export default function ProjectDetails(props) {
    const { activeProject } = props

    return (
        <div
            className="project-details app-onclick"
            menu-type={dropdownType.pickProject}
        >
            {activeProject && <div></div>}
            {!activeProject && <ProjectNewItem/>}
        </div>
    )
}