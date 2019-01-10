import React from 'react'
import { connect } from 'react-redux'

import { addStory } from '../../page/PageReducer'
import { showModal } from '../ModalReducer'

class AddNewStory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }
    
    _onCancel = () => {
        this.props.showModal()
    }

    _onSave = () => {
        const { boardType } = this.props
        const { value } = this.state

        if (value && value.trim()) {
            this.props.addStory(value.trim(), boardType)
            this.props.showModal()
        } else {
            //highlight red.
        }
    }

    _onChange = e => {
        this.setState({
            value: e.target.value
        })
    }

    render() {
        return (
            <div>
                <div style={{ padding: 16 }}>
                    <div className="modal-title">
                        {`New Story`}
                    </div>
                    <div className="modal-subtitle">
                        {`Choose a name for your new story.`}
                    </div>
                    <input
                        className="add-role-input"
                        placeholder="Ideas, Expansions ..."
                        style={{ marginTop: 5 }}
                        onChange={this._onChange}
                        value={this.state.value}
                        autoFocus
                    />
                </div>
                <div className="row dark-grey modal-options">
                    <div className="underline-button" style={{ marginLeft: 'auto' }} onClick={this._onCancel}>
                        {`Cancel`}
                    </div>
                    <div className="modal-button" onClick={this._onSave}>
                        {`Done`}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    {
        addStory,
        showModal,
    }
)(AddNewStory)