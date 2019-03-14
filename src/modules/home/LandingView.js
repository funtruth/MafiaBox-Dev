import React from 'react'
import './Landing.css'

export default function LandingView(props) {
    return (
        <div className="landing-view">
            <i className="landing-image mdi mdi-selection-drag"></i>
            <div className="landing-title">
                {'Select, '}
                <div className="landing-link">Clone,</div>
                {' or '}
                <div className="landing-link">Create</div>
            </div>
            <div className="landing-subtitle">project to get started</div>
        </div>
    )
}