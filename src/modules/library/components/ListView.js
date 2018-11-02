import React from 'react'
import './items.css'
import { connect } from 'react-redux'

import { showRoleInfo } from '../LibraryReducer'

class ListView extends React.Component{
    _renderItem = (item) => {
        let selected = item.roleId === this.props.roleId
        return (
            <div className={selected ? "list-item light-grey" : "list-item"} onClick={this._onClick.bind(this, item)}>
                <div style={styles.title}>{item.roleName}</div>
                <div style={styles.desc}>{item.roleDesc}</div>
            </div>
        )
    }

    _onClick = (item) => {
        this.props.showRoleInfo(item)
    }

    render() {
        return (
            this.props.roles.length ?
                this.props.roles.map(this._renderItem)
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
        roleId: state.library.roleId,
        roles: state.library.roles,
    }),
    {
        showRoleInfo,
    }
)(ListView)