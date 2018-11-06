import React from 'react'
import { connect } from 'react-redux'

import { deleteRole } from '../../roles/RoleReducer'
import { showModalByKey } from '../ModalReducer'
import { navigate } from '../../navigation/NavReducer'

class CloseWindow extends React.Component {
    _onCancel = () => {
        this.props.showModalByKey()
    }

    _onDelete = () => {
        this.props.deleteRole(this.props.modalParams.roleId)
        this.props.showModalByKey()
        this.props.navigate('/home')
    }

    render() {
        const { modalParams } = this.props
        
        return (
            <div>
                <div style={{ padding: 16 }}>
                    <div className="modal-title">
                        {`Delete "${modalParams.roleName}"?`}
                    </div>
                    <div className="modal-subtitle">
                        {`Are you sure you want to delete ${modalParams.roleName}?`}
                    </div>
                </div>
                <div className="row dark-grey modal-options">
                    <div className="underline-button" style={{ marginLeft: 'auto' }} onClick={this._onCancel}>
                        {`Cancel`}
                    </div>
                    <div className="delete-button" onClick={this._onDelete}>
                        {`Delete Role`}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        modalParams: state.modal.modalParams,
    }),
    {
        deleteRole,
        showModalByKey,
        navigate,
    }
)(CloseWindow)