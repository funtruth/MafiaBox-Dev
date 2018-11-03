import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { saveRoleInfoLocally } from '../LibraryReducer'
import { showModalByKey } from '../../modal/ModalReducer'

import { modalType } from '../../modal/modalConfig'

class EditRoleHeader extends React.Component{
    _onSave = () => {
        this.props.saveRoleInfoLocally(this.props.roleInfoWorkspace)
    }

    _onReset = () => {
        this.props.showModalByKey(modalType.discardChanges)
    }

    _onDelete = () => {
        this.props.showModalByKey(modalType.deleteRole)
    }

    render() {
        return (
            <div className="row" style={{ padding: 8}}>
                <Link to="/home"> 
                    <div className="cute-button" style={{ marginLeft: 'auto', marginRight: 8 }}>
                        <i class="option-icon ion-ios-undo"></i>
                        {'Go Back'}
                    </div>
                </Link>
                <div className="cute-button" style={{ marginLeft: 'auto', marginRight: 8 }} onClick={this._onSave}>
                    <i class="option-icon ion-ios-save"></i>
                    {'Save'}
                </div>
                <div className="cute-button" style={{ marginRight: 8 }} onClick={this._onReset}>
                    <i class="option-icon ion-md-refresh"></i>
                    {'Discard Changes'}
                </div>
                <div className="cute-button" onClick={this._onDelete}>
                    <i class="option-icon ion-ios-trash"></i>
                    {'Delete Role'}
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        roleInfoCopy: state.library.roleInfoCopy,
        roleInfoWorkspace: state.library.roleInfoWorkspace,
    }),
    {
        saveRoleInfoLocally,
        showModalByKey,
    }
)(EditRoleHeader)