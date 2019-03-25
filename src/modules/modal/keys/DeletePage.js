import React from 'react'
import { connect } from 'react-redux'

import { removePage } from '../../page/PageReducer' 

import Modal from '../components/Modal';
import Button from '../../components/Button'

function DeletePage(props) {
    const handleCancel = () => {
        props.showModal()
    }

    const handleDelete = () => {
        props.showModal()
    }
    
    return (
        <Modal>
            <div style={{ padding: 16 }}>
                <div className="modal-title">
                    {`Delete ""?`}
                </div>
                <div className="modal-subtitle">
                    {`Are you sure you want to delete ?`}
                </div>
            </div>
            <div className="row dark-grey modal-options">
                <Button theme="grey" onClick={handleCancel}>Cancel</Button>
                <Button theme="red" onClick={handleDelete}>Delete</Button>
            </div>
        </Modal>
    )
}

export default connect(
    null,
    {
        removePage,
    }
)(DeletePage)