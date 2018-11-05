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

    _getPathTitle(key) {
        switch(key) {
            case 'home':
                return 'Storyboard'
            default:
                return this.props.roles[key].roleName
        }
    }

    _onPathClick = (paths, index) => {
        let newPaths = paths.slice(0, index + 1).join('/')

        this.setState({
            redirect: newPaths
        })
    }

    _getHeader(path) {
        let paths = path.split('/')
        let leftBtns = [], rightBtns = []
        
        if (paths[1] === 'home') {
            if (paths[2]) {
                leftBtns = [
                    { key: 'back', icon: 'ion-ios-undo' },
                ]
                rightBtns = [
                    { key: 'delete', title: 'Delete Role', icon: 'ion-ios-trash' },
                ]
            } else {
                leftBtns = [
                    { key: 'back', icon: 'ion-ios-undo' },
                ]
                rightBtns = [
                    { key: 'create', title: 'New Role', icon: 'ion-ios-add-circle' },
                    { key: 'createStory', title: 'Add a Story', icon: 'ion-md-browsers' },
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
            case 'delete':
                return this._onDelete()
            default:
        }
    }

    _onBack = () => {
        let paths = this.props.location.pathname.split('/')
        paths.pop()
        paths = paths.join('/')

        this.setState({
            redirect: paths
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
            <div className="row cute-button" style={{ marginLeft: index ? 8 : 0 }} onClick={this._onClick.bind(this, item.key)}>
                <i class={`option-icon ${item.icon}`}></i>
                {item.title && <div style={{ marginLeft: 6 }}>{item.title}</div>}
            </div>
        )
    }

    _renderPath() {
        const { pathname } = this.props.location
        let paths = pathname.split('/')

        return (
            <div className="row" style={{ marginRight: 'auto' }}>
                {paths.map((item, index) => (
                    <div className="row-centered path-view">
                        {index > 1 ? <div className="path-separator">{'/'}</div>
                        :<div style={{width: 4}}/>}
                        {item && <div className="path-button" onClick={this._onPathClick.bind(this, paths, index)}>
                            {this._getPathTitle(item)}
                        </div>}
                    </div>
                ))}
            </div>
        )
    }

    render() {
        return (
            <div className="row header">
                {this._redirect()}
                {this.state.leftBtns.map(this._renderItem)}
                {this._renderPath()}
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