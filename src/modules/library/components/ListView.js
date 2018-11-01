import React from 'react'
import { connect } from 'react-redux'

class ListView extends React.Component{
    _renderItem = (item) => {
        return (
            <div style={styles.item}>
                <div style={styles.title}>{item.roleName}</div>
                <div style={styles.desc}>{item.roleDesc}</div>
            </div>
        )
    }

    render() {
        return (this.props.roles.map(this._renderItem))
    }
}

const styles = {
    item: {
        padding: '6px 12px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        cursor: 'default',
    },
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
        roles: state.library.roles,
    })
)(ListView)