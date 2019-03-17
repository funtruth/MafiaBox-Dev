import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import ProjectListItem from '../../home/components/ProjectListItem';
import ProjectNewListItem from '../../home/components/ProjectNewListItem';

function PickProject(props) {
    const { projects, activeProject } = props

    const projectList = _.toArray(projects)

    return (
        <div>
            {projectList.map(item => {
                const chosen = (item.projectKey === activeProject).toString()

                return (
                    <div key={item.projectKey} className="project-details">
                        <ProjectListItem project={item} chosen={chosen}/>
                    </div>
                )
            })}
            <ProjectNewListItem/>
        </div>
    )
}

export default connect(
    state => ({
        activeProject: state.firebase.activeProject,
        projects: state.firebase.projects,
    })
)(PickProject)