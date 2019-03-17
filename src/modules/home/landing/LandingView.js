import React from 'react'
import './Landing.css'
import { connect } from 'react-redux'

import { modalType } from '../../modal/types'

import { showModal } from '../../modal/ModalReducer'

function LandingView(props) {
    const handleCreate = () => props.showModal(modalType.createProject)

    return (
        <div className="landing-view">
            <i className="landing-image mdi mdi-selection-drag"></i>
            <div className="landing-title">
                {'Select, '}
                <div className="landing-link">Clone,</div>
                {' or '}
                <div className="landing-link" onClick={handleCreate}>Create</div>
            </div>
            <div className="landing-subtitle">project to get started</div>
        </div>
    )
}

export default connect(
    null,
    {
        showModal,
    }
)(LandingView)