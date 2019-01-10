import React from 'react'
import { connect } from 'react-redux'

import { showModal } from '../ModalReducer'

class EditTrigger extends React.Component {
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
        const { value } = this.state

        if (value && value.trim()) {
            //TODO add new story
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
            <div
                cancel-appclick="true"
            >
                <div style={{ padding: 16 }}>
                    <div className="modal-title">
                        {`New Field`}
                    </div>
                    <div className="modal-subtitle">
                        {`Choose a label for your new field.`}
                    </div>
                    <input
                        className="add-role-input"
                        placeholder="Name, Action ..."
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
        showModal,
    }
)(EditTrigger)