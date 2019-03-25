import React from 'react'
import { connect } from 'react-redux'

import { removePage } from '../../page/PageReducer' 

import Modal from '../components/Modal';

function DeletePage(props) {
    const _onCancel = () => {
        props.showModal()
    }

    const _onDelete = () => {
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
                <div className="underline-button" style={{ marginLeft: 'auto' }} onClick={_onCancel}>
                    {`Cancel`}
                </div>
                <div className="delete-button" onClick={_onDelete}>
                    {`Delete Role`}
                </div>
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