import React from 'react'
import { connect } from 'react-redux'

import { updateRoleInfo } from '../LibraryReducer'

class PropertyItem extends React.Component{
    _renderItem = (item, index) => {
        const { roleInfo, name } = this.props
        const active = roleInfo && name && item.key === roleInfo[name]
        const style = {
            ...styles.tag,
            backgroundColor: active ? item.color : 'hsla(0,0%,100%,.1)',
        }
        return (
            <div style={style} onClick={this._onClick.bind(this, item.key)}>
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
    tag: {
        marginBottom: 4,
        marginRight: 8,
        borderRadius: 4,
        padding: 6,
        paddingLeft: 16,
        paddingRight: 16,
        fontSize: 15,
        fontWeight: '500',
        fontFamily: 'Arial',
        color: '#fff',
        cursor: 'pointer'
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
        roleInfo: state.library.roleInfo,
    }),
    {
        updateRoleInfo,
    }
)(PropertyItem)