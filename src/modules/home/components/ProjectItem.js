import React from 'react'

export default function ProjectItem(props) {
    const { project, chosen } = props

    if (!project) return null;

    const { title } = project
    const firstLetter = title.charAt(0) || '*'

    return (
        <div className="project-item" chosen={chosen}>
            <div className="project-icon">{firstLetter}</div>
            <div className="project-text">
                <div className="project-title">{title}</div>
            </div>
            <i
                className="mdi mdi-dots-vertical"
                style={{
                    marginLeft: 'auto',
                    fontSize: 18,
                }}
            ></i>
        </div>
    )
}