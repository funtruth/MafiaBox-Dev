import React from 'react'
import './Dashboard.css'

export default function DashboardView(props) {
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