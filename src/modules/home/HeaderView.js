import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { createNewRole, deleteRole, setRoleIdToDefault } from '../roles/RoleReducer'
import { showModalByKey } from '../modal/ModalReducer'
import { navigate, goBack } from '../navigation/NavReducer'
import * as helpers from '../roles/helpers'

import { modalType } from '../modal/modalConfig'
import { pathKey, pathToLabel } from '../navigation/paths'

class HeaderView extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
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
        if (pathToLabel[key]) return pathToLabel[key]
        else return (this.props.roles[key] && this.props.roles[key].roleName) || 'Untitled'
    }

    _onPathClick = (paths, index) => {
        let newPath = paths.slice(0, index + 1).join('/')
        this.props.navigate(newPath)
    }

    _getHeader(path) {
        let paths = path.split('/')
        let leftBtns = [], rightBtns = []
        
        leftBtns = [
            { key: 'back', icon: 'ion-ios-undo' },
        ]
        
        if (paths[1] === pathKey.board) {
            if (paths[2]) {
                rightBtns = [
                    { key: 'done', title: 'Done', icon: 'ion-md-checkmark' },
                    { key: 'defaults', title: 'Apply Defaults', icon: 'ion-md-document' },
                    { key: 'delete', title: 'Discard Role', icon: 'ion-ios-trash' },
                ]
            } else {
                rightBtns = [
                    { key: 'create', title: 'New Role', icon: 'ion-ios-add-circle' },
                    { key: 'createStory', title: 'Add a Story', icon: 'ion-md-browsers' },
                ]
            }
        } else if (paths[1] === pathKey.defaults) {
            rightBtns = [
                { key: 'done', title: 'Done', icon: 'ion-md-checkmark' },
                { key: 'createField', title: 'Add a Field', icon: 'ion-md-browsers' },
            ]
        }

        return {
            childPath: paths[2],
            leftBtns,
            rightBtns
        }
    }

    _onClick = (key) => {
        switch(key) {
            case 'back':
            case 'done':
                return this.props.goBack()
            case 'defaults':
                return this.props.setRoleIdToDefault(this.state.childPath)
            case 'create':
                return this._onCreate()
            case 'createStory':
                return this.props.showModalByKey(modalType.addNewStory)
            case 'createField':
                return this.props.showModalByKey(modalType.addNewField)
            case 'delete':
                return this._onDelete()
            default:
        }
    }

    _onCreate = () => {
        const { gameKey, roles } = this.props

        let uid = helpers.genUID(gameKey)
        while(roles[uid]) {
            uid = helpers.genUID(gameKey)
        }

        this.props.navigate(`/${pathKey.board}/${uid}`)
        this.props.createNewRole(uid)
    }

    _onDelete = () => {
        let paths = this.props.location.pathname.split('/')
        let roleId = paths.pop()
        let roleName = this.props.roles[roleId] && this.props.roles[roleId].roleName

        if (!roleName) {
            this.props.deleteRole(roleId)
            this.props.navigate(`/${pathKey.board}`)
        } else {
            this.props.showModalByKey(modalType.deleteRole,
                { roleId, roleName: this.props.roles[roleId].roleName }
            )
        }
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
                        :<div style={{width: 2}}/>}
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
        deleteRole,
        setRoleIdToDefault,
        showModalByKey,
        navigate,
        goBack,
    }
)(HeaderView))