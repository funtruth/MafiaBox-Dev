import React from 'react'
import { connect } from 'react-redux'

import { removeStory } from '../../page/PageReducer'
import { unnormalize } from '../../common/selectors';

import Modal from '../components/Modal'

function DeleteStory(props) {
    const { boardType, mapKey, storyMap } = props
    const storyInfo = storyMap[mapKey]

    const handleCancel = () => {
        props.showModal()
    }

    const handleDelete = () => {
        props.removeStory(boardType, mapKey)
        props.showModal()
    }
    
    return (
        <Modal>
            <div style={{ padding: 16 }}>
                <div className="modal-title">
                    {`Delete '${storyInfo.title}'?`}
                </div>
                <div className="modal-subtitle">
                    {`Are you sure you want to delete ${storyInfo.title}?`}
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
        storyMap: unnormalize(state.page.storyMap),
    }),
    {
        removeStory,
    }
)(DeleteStory)