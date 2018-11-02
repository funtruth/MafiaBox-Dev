import React from 'react'
import './items.css'
import { connect } from 'react-redux'

import { showRoleInfo } from '../LibraryReducer'

class ListView extends React.Component{
    _renderItem = (item) => {
        const { roles, roleInfoWorkspace } = this.props
        if (!item) return null
        let roleInfo = roles[item]
        let selected = item === roleInfoWorkspace.roleId

        return (
            <div className={selected ? "list-item light-grey" : "list-item"} onClick={this._onClick.bind(this, item)}>
                <div style={styles.title}>{roleInfo.roleName}</div>
                <div style={styles.desc}>{roleInfo.roleDesc}</div>
            </div>
        )
    }

    _onClick = (item) => {
        this.props.showRoleInfo(item)
    }

    render() {
        return (
            this.props.history.length ?
                this.props.history.map(this._renderItem)
                :null
        )
    }
}

const styles = {
    title: {
        fontSize: 14,
        lineHeight: 1.3,
        fontWeight: '500',
        fontFamily: 'Arial',
        color: '#f6f6f7',   
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    desc: {
        fontSize: 12,
        lineHeight: 1.3,
        fontWeight: '500',
        fontFamily: 'Arial',
        color: '#d6d6d6',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
}

export default connect(
    state => ({
        history: state.library.history,
        roles: state.library.roles,
        roleInfoWorkspace: state.library.roleInfoWorkspace,
    }),
    {
        showRoleInfo,
    }
)(ListView)