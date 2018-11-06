import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

import { heights } from '../common/dim'

class SideBarView extends React.Component{
    state = {
        redirect: false
    }

    componentWillReceiveProps(newProps) {
        if (newProps.path !== this.props.path) {
            this.setState({
                redirect: newProps.path
            })
        }
    }

    _renderItem = (item) => {
        const { roles, location } = this.props
        if (!item) return null

        let roleInfo = roles[item]
        if (!roleInfo) return null
            
        let path = location.pathname
        let paths = path.split('/')
        let selected = item === paths[paths.length - 1]

        return (
            <div className={selected ? "list-item light-grey" : "list-item"} onClick={this._onClick.bind(this, item)}>
                <div style={styles.title}>{roleInfo.roleName}</div>
                <div style={styles.desc}>{roleInfo.roleDesc}</div>
            </div>
        )
    }

    _onClick = (item) => {
        this.setState({
            redirect: `/home/${item}`
        })
    }

    _redirect() {
        if (!this.state.redirect) return null
        //hack for now
        this.setState({
            redirect: false
        })
        return (
            <Redirect to={this.state.redirect}/>
        )
    }

    render() {
        return (
            <div style={styles.container}>
                {this._redirect()}
                <div style={styles.header}>

                </div>

                <div className="scrollable-y">
                    {this.props.history.length ?
                        this.props.history.map(this._renderItem)
                    :null}
                </div>
            </div>
        )
    }
}

const styles = {
    container: {
        width: '200px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgba(47, 49, 54, 1)',
    },
    header: {
        height: heights.header,
        backgroundColor: 'rgba(40, 43, 48)',
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

export default withRouter(connect(
    state => ({
        history: state.roles.history,
        roles: state.roles.roles,

        path: state.nav.path,
    }),
)(SideBarView))