import React from 'react'
import { connect } from 'react-redux'

import { updateRoleInfo } from '../RoleReducer'

class PropertyItem extends React.Component{
    _renderItem = (item) => {
        const { roleInfoWorkspace, name } = this.props
        const active = roleInfoWorkspace && name && item.key === roleInfoWorkspace[name]
        const style = {
            backgroundColor: active ? item.color : 'hsla(0,0%,100%,.1)',
        }
        return (
            <div className="property-button" style={style} onClick={this._onClick.bind(this, item.key)}>
                {item.label}
            </div>
        )
    }

    _onClick = key => {
        this.props.updateRoleInfo(this.props.name, key)
    }

    render() {
        const { label, data } = this.props
        if (!data) return null
        
        return (
            <div style={styles.item}>
                <div style={styles.text}>
                    {label}
                </div>
                <div className="row">
                    {data.map(this._renderItem)}
                </div>
            </div>
        )
    }
}

const styles = {
    item: {
        padding: 4,
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
        fontFamily: 'Arial',
        color: '#f6f6f7',
    },
}

export default connect(
    state => ({
        roleInfoWorkspace: state.roles.roleInfoWorkspace,
    }),
    {
        updateRoleInfo,
    }
)(PropertyItem)