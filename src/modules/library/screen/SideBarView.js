import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { createNewRole } from '../LibraryReducer'
import ListView from '../components/ListView';

import { heights } from '../dim'

class SideBarView extends React.Component{
    state = {
        redirect: false
    }
    _onCreateRole = () => {
        this.setState({
            redirect: true
        })
    }

    render() {
        return (
            <div style={styles.container}>
                <div style={styles.header}>

                </div>

                <div className="scrollable-y">
                    <ListView/>
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
}

export default connect(
    state => ({
        roles: state.library.roles,
        roleId: state.library.roleId,
    }),
    {
        createNewRole,
    }
)(SideBarView)