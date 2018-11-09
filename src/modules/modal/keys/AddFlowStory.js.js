import React from 'react'
import { connect } from 'react-redux'

import { showModalByKey } from '../ModalReducer'
import { addFlowStory } from '../../flow/FlowReducer'

class AddNewStory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }
    
    _onCancel = () => {
        this.props.showModalByKey()
    }

    _onSave = () => {
        const { value } = this.state

        if (value && value.trim()) {
            this.props.addFlowStory(value)
            this.props.showModalByKey()
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
                        {`New Story!!`}
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
        addFlowStory,
        showModalByKey,
    }
)(AddNewStory)