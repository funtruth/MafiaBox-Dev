import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { navigate } from '../navigation/NavReducer'

import { heights } from '../common/dim'
import { pathType } from '../navigation/paths'

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
        const { location } = this.props
        let path = location.pathname
        let paths = path.split('/')
        let selected = item.key === paths[1]

        return (
            <div
                key={item.key}
                className={selected ? "list-item-selected" : "list-item"}
                onClick={this._onClick.bind(this, item)}
            >
                <div style={styles.title}>{item.label}</div>
                <div style={styles.desc}>{item.desc}</div>
            </div>
        )
    }

    _onClick = (item) => {
        this.props.navigate(`/${item.key}`)
    }

    _redirect() {
        if (!this.state.redirect) return null
        
        this.setState({
            redirect: false
        })

        return (
            <Redirect to={this.state.redirect}/>
        )
    }

    render() {
        const items = _.sortBy(pathType, i => i.index)

        return (
            <div className="side-bar-view">
                {this._redirect()}

                <div style={styles.header}>
                </div>

                <div className="scrollable-y">
                    {items.map(this._renderItem)}
                </div>
            </div>
        )
    }
}

const styles = {
    header: {
        height: heights.header,
        backgroundColor: 'rgba(40, 43, 48)',
    },
    title: {
        fontSize: 13,
        lineHeight: 1.3,
        letterSpacing: 0.3,
        fontWeight: '500',
        fontFamily: 'Arial',
        color: '#f6f6f7',   
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    desc: {
        fontSize: 11,
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
        path: state.nav.path,
    }),
    {
        navigate,
    }
)(SideBarView)