import React from 'react'

export default function ProjectItem(props) {
    const { title, description } = props
    const firstLetter = props.firstLetter || title.charAt(0)

    return (
        <div className="project-item">
            <div className="project-icon">{firstLetter}</div>
            <div className="project-text">
                <div className="project-title">{title}</div>
                <div className="project-subtitle">{description}</div>
            </div>
            <i className="mdi mdi-flag"></i>
        </div>
    )
}