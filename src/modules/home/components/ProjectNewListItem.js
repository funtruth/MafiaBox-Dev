import React from 'react'
import { connect } from 'react-redux'

import { modalType } from '../../modal/types'

import { showModal } from '../../modal/ModalReducer'
import { showDropdown } from '../../dropdown/DropdownReducer'

const styles = {
    item: {
        borderTop: '1px solid #464646',
    },
    icon: {
        height: '1.3em',
        width: '1.3em',
        borderRadius: 4,
        backgroundColor: '#989898',
        opacity: 0.5,
        color: 'rgba(47, 49, 54, 1)',
        font: '600 25px Arial',
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
        font: '400 14px Arial',
    },
}

function ProjectNewListItem(props) {
    const handleClick = () => {
        props.showDropdown()
        props.showModal(modalType.createProject)
    }

    return (
        <div className="project-item" style={styles.item} onClick={handleClick}>
            <i className="mdi mdi-plus" style={styles.icon}></i>
            <div style={styles.text}>
                <div styles={styles.title}>New project</div>
            </div>
        </div>
    )
}

export default connect(
    null,
    {
        showModal,
        showDropdown,
    }
)(ProjectNewListItem)