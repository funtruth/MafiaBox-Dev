import React from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'

import { createNewRole } from '../roles/RoleReducer'
import { showModalByKey } from '../modal/ModalReducer'
import * as helpers from '../roles/helpers'

import { modalType } from '../modal/modalConfig'

class HeaderView extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            ...this._getHeader(props.location.pathname)
        }
    }
    
    componentWillReceiveProps(newProps) {
        if (newProps.location.pathname !== this.props.location.pathname){ 
            this.setState(
                this._getHeader(newProps.location.pathname)
            )
        }
    }

    _getHeader(path) {
        let paths = path.split('/')
        let leftBtns = [], rightBtns = []
        
        if (paths[1] === 'home') {
            if (paths[2]) {
                leftBtns = [
                    { key: 'back', title: 'Go Back', icon: 'ion-ios-undo' }
                ]
                rightBtns = [
                    { key: 'delete', title: 'Delete Role', icon: 'ion-ios-trash' },
                ]
            } else {
                leftBtns = [
                    { key: 'create', title: 'New Role', icon: 'ion-ios-add-circle' },
                    { key: 'createStory', title: 'Add a Story', icon: 'ion-md-browsers' },
                ]
                rightBtns = [
                    { key: 'discard', title: 'Discard Changes', icon: 'ion-md-refresh' },
                ]
            }
        }

        return {
            redirect: path,
            leftBtns,
            rightBtns
        }
    }

    _onClick = (key) => {
        switch(key) {
            case 'back':
                return this._onBack()
            case 'create':
                return this._onCreate()
            case 'discard':
                return this._onReset()
            case 'delete':
                return this._onDelete()
            default:
        }
    }

    _onBack = () => {
        this.setState({
            redirect: '/home'
        })
    }

    _onCreate = () => {
        const { gameKey, roles } = this.props

        let uid = helpers.genUID(gameKey)
        while(roles[uid]) {
            uid = helpers.genUID(gameKey)
        }

        this.setState({
            redirect: `/home/${uid}`
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
                pathname: this.state.redirect
            }}/>
        )
    }

    _renderItem = (item, index) => {
        return (
            <div className="cute-button" style={{ marginLeft: index ? 8 : 0 }} onClick={this._onClick.bind(this, item.key)}>
                <i class={`option-icon ${item.icon}`}></i>
                {item.title}
            </div>
        )
    }

    render() {
        return (
            <div className="row header">
                {this._redirect()}
                {this.state.leftBtns.map(this._renderItem)}
                <div style={{ marginLeft: 'auto' }}/>
                {this.state.rightBtns.map(this._renderItem)}
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