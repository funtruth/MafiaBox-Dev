import React from 'react'
import { connect } from 'react-redux'

import { switchToProject } from '../../firebase/FirebaseReducer'
import { showDropdown } from '../../dropdown/DropdownReducer'

const styles = {
    icon: {
        height: '1.3em',
        width: '1.3em',
        borderRadius: 4,
        color: 'rgba(47, 49, 54, 1)',
        font: '600 23px Segoe UI',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase',
    },
    text: {
        padding: '0px 0.9em',
    },
    title: {
        color: '#ccc',
        font: '600 14px Segoe UI',
    },
    subtitle: {
        color: '#999',
        font: '400 12px Segoe UI',
        width: 80,
    },
}

function ProjectListItem(props) {
    const { project, chosen } = props

    if (!project) return null;

    const { title, description, key } = project
    const firstLetter = title.charAt(0) || '*'

    const iconStyle = {
        ...styles.icon,
        backgroundColor: (chosen === 'true') ? '#ddd' : '#989898',
        opacity: (chosen === 'true') ? 1 : 0.5,
    }
    
    const handleClick = () => {
        props.showDropdown()
        props.switchToProject(key)
    }

    return (
        <div className="project-item" chosen={chosen} onClick={handleClick}>
            <div style={iconStyle}>{firstLetter}</div>
            <div style={styles.text}>
                <div style={styles.title}>{title}</div>
                <div className="text-ellipsis" style={styles.subtitle}>{description}</div>
            </div>
            {(chosen === 'true') &&
                <i className="mdi mdi-check" style={{ fontSize: 22 }}></i>
            }
        </div>
    )
}

export default connect(
    null,
    {
        switchToProject,
        showDropdown,
    }
)(ProjectListItem)