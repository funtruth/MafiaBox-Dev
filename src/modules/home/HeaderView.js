import React from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter, Link } from 'react-router-dom'

import { createNewRole } from '../roles/RoleReducer'
import { showModalByKey } from '../modal/ModalReducer'
import * as helpers from '../roles/helpers'

import { modalType } from '../modal/modalConfig'

class HeaderView extends React.Component{
    state = {
        redirect: false
    }
    
    componentWillReceiveProps(newProps) {
        let path = newProps.location.pathname
        let paths = path.split('/')
        console.log(paths)
    }

    _onCreate = () => {
        const { gameKey, roles } = this.props

        let uid = helpers.genUID(gameKey)
        while(roles[uid]) {
            uid = helpers.genUID(gameKey)
        }

        this.setState({
            redirect: uid
        })
        this.props.createNewRole(uid)
    }

    _onReset = () => {
        this.props.showModalByKey(modalType.discardChanges)
    }

    _onDelete = () => {
        this.props.showModalByKey(modalType.deleteRole)
    }

    _redirect() {
        if (!this.state.redirect) return null
        return (
            <Redirect to={{
                pathname: `/home/${this.state.redirect}`,
            }}/>
        )
    }

    render() {
        return (
            <div className="row header">
                {this._redirect()}
                <Link to="/home"> 
                    <div className="cute-button" style={{ marginRight: 8 }} onClick={this._goBack}>
                        <i class="option-icon ion-ios-undo"></i>
                        {'Go Back'}
                    </div>
                </Link>
                <Link to="/home/edit"> 
                    <div className="cute-button" style={{ marginRight: 8 }} onClick={this._onCreate}>
                        <i class="option-icon ion-ios-add-circle"></i>
                        {'Add Role'}
                    </div>
                </Link>
                
                <div className="cute-button" style={{ marginLeft: 'auto', marginRight: 8 }} onClick={this._onReset}>
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
        gameKey: state.roles.gameKey,
        roles: state.roles.roles,
    }),
    {
        createNewRole,
        showModalByKey,
    }
)(HeaderView))