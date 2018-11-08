import React from 'react'
import { connect } from 'react-redux'

import { navigate } from '../../navigation/NavReducer'

import { flowBarList } from '../../navigation/paths'

class SideBarView extends React.Component{
    _renderItem = (item) => {
        const { path } = this.props
        let paths = path.split('/')
        let selected = item.key === paths[2]

        return (
            <div key={item.key} className={selected ? "list-item-selected" : "list-item"} onClick={this._onClick.bind(this, item)}>
                <div style={styles.title}>{item.title}</div>
                <div style={styles.desc}>{item.subtitle}</div>
            </div>
        )
    }

    _onClick = (item) => {
        this.props.navigate(`/flow/${item.key}`)
    }

    render() {
        return (
            <div className="side-bar-view">
                <div style={styles.header}>
                </div>

                <div className="scrollable-y">
                    {flowBarList.map(this._renderItem)}
                </div>
            </div>
        )
    }
}

const styles = {
    header: {
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