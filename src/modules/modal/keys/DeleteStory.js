import React from 'react'
import { connect } from 'react-redux'

import { removeStory } from '../../page/PageReducer'

import Modal from '../components/Modal'

function DeleteStory(props) {
    const { boardType, storyKey, storyRepo } = props
    const storyInfo = storyRepo[storyKey] || {}

    const { title } = storyInfo

    const handleCancel = () => {
        props.showModal()
    }

    const handleDelete = () => {
        props.removeStory(boardType, storyKey)
        props.showModal()
    }
    
    return (
        <Modal>
            <div style={{ padding: 16 }}>
                <div className="modal-title">
                    {`Delete '${title || "this patch"}'?`}
                </div>
                <div className="modal-subtitle">
                    {`Are you sure you want to delete ${title || "this patch"}?`}
                </div>
            </div>
            <div className="row dark-grey modal-options">
                <div className="underline-button" style={{ marginLeft: 'auto' }} onClick={handleCancel}>
                    {`Cancel`}
                </div>
                <div className="delete-button" onClick={handleDelete}>
                    {`Delete Story`}
                </div>
            </div>
        </Modal>
    )
}

export default connect(
    state => ({
        storyRepo: state.page.storyRepo,
    }),
    {
        removeStory,
    }
)(DeleteStory)