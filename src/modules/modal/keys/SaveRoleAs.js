import React from 'react'
import { connect } from 'react-redux'

import { saveRoleInfo } from '../../roles/RoleReducer'
import { showModalByKey } from '../ModalReducer'

class SaveRoleAs extends React.Component {
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
        const { roleInfoWorkspace } = this.props

        if (value && value.trim()) {
            let roleInfo = { ...roleInfoWorkspace, roleName: value }
            this.props.saveRoleInfo(roleInfo)
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
                        {`Save role as?`}
                    </div>
                    <div className="modal-subtitle">
                        {`You must choose a name for your role.`}
                    </div>
                    <input
                        className="add-role-input"
                        placeholder="Doctor, Detective ..."
                        style={{ marginTop: 5 }}
                        onInput={this._onChange}
                        value={this.state.value}
                    />
                </div>
                <div className="row dark-grey modal-options">
                    <div className="underline-button" style={{ marginLeft: 'auto' }} onClick={this._onCancel}>
                        {`Cancel`}
                    </div>
                    <div className="modal-button" onClick={this._onSave}>
                        {`Save as`}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        roleInfoWorkspace: state.roles.roleInfoWorkspace,
    }),
    {
        saveRoleInfo,
        showModalByKey,
    }
)(SaveRoleAs)