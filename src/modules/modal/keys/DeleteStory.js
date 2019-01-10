import React from 'react'
import { connect } from 'react-redux'

import { showModal } from '../ModalReducer'
import { navigate } from '../../navigation/NavReducer'

class DeleteStory extends React.Component {
    _onCancel = () => {
        this.props.showModal()
    }

    _onDelete = () => {
        //TODO delete story
        this.props.showModal()
    }

    render() {
        const { storyIndex, pageRepo } = this.props
        
        return (
            <div>
                <div style={{ padding: 16 }}>
                    <div className="modal-title">
                        {`Delete '${pageRepo[storyIndex].title}'?`}
                    </div>
                    <div className="modal-subtitle">
                        {`Are you sure you want to delete ${pageRepo[storyIndex].title}?`}
                    </div>
                </div>
                <div className="row dark-grey modal-options">
                    <div className="underline-button" style={{ marginLeft: 'auto' }} onClick={this._onCancel}>
                        {`Cancel`}
                    </div>
                    <div className="delete-button" onClick={this._onDelete}>
                        {`Delete Story`}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    }),
    {
        showModal,
        navigate,
    }
)(DeleteStory)