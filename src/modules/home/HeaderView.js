import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import { clearRoleInfo, saveRoleInfoLocally } from '../roles/RoleReducer'
import { showModalByKey } from '../modal/ModalReducer'

import { modalType } from '../modal/modalConfig'

class HeaderView extends React.Component{
    componentWillReceiveProps(newProps) {
        let path = newProps.location.pathname
        let paths = path.split('/')
        console.log(paths)
    }

    _goBack = () => {
        this.props.clearRoleInfo()
    }

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
                    <div className="cute-button" style={{ marginLeft: 'auto', marginRight: 8 }} onClick={this._goBack}>
                        <i class="option-icon ion-ios-undo"></i>
                        {'Go Back'}
                    </div>
                </Link>
                <Link to="/home/edit"> 
                    <div className="cute-button" style={{ marginRight: 8 }}>
                        <i class="option-icon ion-ios-add-circle"></i>
                        {'Add Role'}
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

export default withRouter(connect(
    state => ({
        roleInfoCopy: state.roles.roleInfoCopy,
        roleInfoWorkspace: state.roles.roleInfoWorkspace,
    }),
    {
        clearRoleInfo,
        saveRoleInfoLocally,
        showModalByKey,
    }
)(HeaderView))