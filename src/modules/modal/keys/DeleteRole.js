import React from 'react'
import { connect } from 'react-redux'

import { showModal } from '../ModalReducer'
import { navigate } from '../../navigation/NavReducer'

class CloseWindow extends React.Component {
    _onCancel = () => {
        this.props.showModal()
    }

    _onDelete = () => {
        const { roleId } = this.props
        this.props.deleteRole(roleId)
        this.props.showModal()
        this.props.navigate('/board')
    }

    render() {
        const { roleName } = this.props
        
        return (
            <div>
                <div style={{ padding: 16 }}>
                    <div className="modal-title">
                        {`Delete "${roleName}"?`}
                    </div>
                    <div className="modal-subtitle">
                        {`Are you sure you want to delete ${roleName}?`}
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
    null,
    {
        showModal,
        navigate,
    }
)(CloseWindow)