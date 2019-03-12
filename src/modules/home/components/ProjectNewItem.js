import React from 'react'
import { connect } from 'react-redux'

import { modalType } from '../../modal/types'

import { showModal } from '../../modal/ModalReducer'

function ProjectNewItem(props) {
    const handleClick = () => {
        props.showModal(modalType.createProject, {

        })
    }

    return (
        <div className="project-item" onClick={handleClick}>
            <i className="project-new-icon mdi mdi-plus"></i>
            <div className="project-text">
                <div className="project-new">New project</div>
            </div>
        </div>
    )
}

export default connect(
    null,
    {
        showModal,
    }
)(ProjectNewItem)