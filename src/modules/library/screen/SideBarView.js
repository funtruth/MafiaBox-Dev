import React from 'react'
import { connect } from 'react-redux'

import { createNewRole } from '../LibraryReducer'
import ListView from '../components/ListView';

import { heights } from '../dim'

class SideBarView extends React.Component{
    _onCreateRole = () => {
        this.props.createNewRole()
    }

    render() {
        return (
            <div style={styles.container}>
                <div style={styles.header}>

                </div>

                <div className="scrollable-y" style={styles.list}>
                    <ListView/>
                </div>
                <div className="footer" onClick={this._onCreateRole}>
                    <i class="add-role-icon ion-md-person-add"></i>
                    {'CREATE ROLE'}
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