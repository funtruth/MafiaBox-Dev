import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import ProjectNewItem from '../../home/components/ProjectNewItem'
import ProjectItem from '../../home/components/ProjectItem';

function PickProject(props) {
    const { projects, activeProject } = props

    const projectList = _.toArray(projects)

    return (
        <div>
            {projectList.map(item => {
                const chosen = (item.projectKey === activeProject).toString()

                return (
                    <div key={item.projectKey} className="project-details">
                        <ProjectItem project={item} chosen={chosen}/>
                    </div>
                )
            })}
            <ProjectNewItem
                firstLetter="+"
                title="New project"
            />
        </div>
    )
}

export default connect(
    state => ({
        activeProject: state.firebase.activeProject,
        projects: state.firebase.projects,
    })
)(PickProject)