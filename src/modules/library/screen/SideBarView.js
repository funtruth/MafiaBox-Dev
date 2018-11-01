import React from 'react'
import { connect } from 'react-redux'

import { toggleEditRoleView } from '../LibraryReducer'
import ListView from '../components/ListView';

import { heights } from '../dim'

class SideBarView extends React.Component{
    render() {
        return (
            <div style={styles.container}>
                <div style={styles.header}>

                </div>

                <div className="scrollable-y" style={styles.list}>
                    <ListView/>
                </div>
                <div style={styles.footer} onClick={this.props.toggleEditRoleView}>

                </div>
            </div>
        )
    }
}

const styles = {
    container: {
        width: '150px',
        flexDirection: 'column',
        backgroundColor: 'rgba(47, 49, 54, 1)',
    },
    header: {
        height: heights.header,
        width: '100%',
        backgroundColor: 'rgba(40, 43, 48)',
    },
    list: {
        height: heights.list,
        width: '100%',
        backgroundColor: 'rgba(47, 49, 54)',
    },
    footer: {
        height: heights.footer,
        width: '100%',
        backgroundColor: 'rgba(40, 43, 48)',
    }
}

export default connect(
    state => ({
        roles: state.library.roles,
        roleId: state.library.roleId,
    }),
    {
        toggleEditRoleView,
    }
)(SideBarView)