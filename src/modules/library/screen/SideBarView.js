import React from 'react'
import { connect } from 'react-redux'

import { toggleAddRoleView } from '../LibraryReducer'

class SideBarView extends React.Component{
    render() {
        return (
            <div style={styles.container}>
                <div style={styles.header}>

                </div>

                <div style={styles.list}>

                </div>
                <div style={styles.footer} onClick={this.props.toggleAddRoleView}>

                </div>
            </div>
        )
    }
}

const styles = {
    container: {
        flex: 0.25,
        flexDirection: 'column',
        backgroundColor: 'rgba(47, 49, 54)',
    },
    header: {
        height: '15%',
        width: '100%',
        backgroundColor: 'rgba(40, 43, 48)',
    },
    list: {
        height: '75%',
        width: '100%',
        backgroundColor: 'rgba(47, 49, 54)',
    },
    footer: {
        height: '10%',
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
        toggleAddRoleView,
    }
)(SideBarView)