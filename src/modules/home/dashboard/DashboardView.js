import React from 'react'
import './Dashboard.css'
import { connect } from 'react-redux'

import { modalType } from '../../modal/types'

import { showModal } from '../../modal/ModalReducer'

function DashboardView(props) {
    const handleCreate = () => {

    }

    return (
        <div className="dashboard-view">
            <i className="landing-image mdi mdi-view-dashboard"></i>
            <div className="landing-title">Getting Started</div>
            <div className="dashboard-subtitle">
                select a dev tool from the
                <br/>
                sidebar to get started
            </div>
        </div>
    )
}

export default connect(
    null,
    {
        showModal,
    }
)(DashboardView)