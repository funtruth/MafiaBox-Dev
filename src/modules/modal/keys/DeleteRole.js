import React from 'react'
import { connect } from 'react-redux'

import { deleteRole } from '../../library/LibraryReducer'
import { showModalByKey } from '../ModalReducer'

class CloseWindow extends React.Component {
    _onCancel = () => {
        this.props.showModalByKey()
    }

    _onDelete = () => {
        this.props.deleteRole()
        this.props.showModalByKey()
    }

    render() {
        const { roleInfoWorkspace } = this.props
        return (
            <div>
                <div style={{ padding: 16 }}>
                    <div className="modal-title">
                        {`Delete "${roleInfoWorkspace.roleName}"?`}
                    </div>
                    <div className="modal-subtitle">
                        {`Are you sure you want to delete ${roleInfoWorkspace.roleName}?`}
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
        roleInfoWorkspace: state.library.roleInfoWorkspace,
    }),
    {
        deleteRole,
        showModalByKey,
    }
)(CloseWindow)