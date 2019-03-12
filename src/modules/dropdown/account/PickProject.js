import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import ProjectNewItem from '../../home/components/ProjectNewItem'

function PickProject(props) {
    const { projects } = props

    const projectList = _.toArray(projects)
    const projectCount = projectList.length

    return (
        <div>
            {!!projectCount && projectList.map(item => (
                <div className="side-bar-item">

                </div>
            ))}
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