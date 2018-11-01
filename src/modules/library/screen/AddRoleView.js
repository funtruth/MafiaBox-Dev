import React from 'react'
import { connect } from 'react-redux'

import InputItem from '../components/InputItem'

class AddRoleView extends React.Component{
    render() {
        if (!this.props.showAddRoleView) return null
        return (
            <div style={styles.container}>
                <InputItem name="roleId" label="Unique Role ID" placeholder="1234"/>
                <InputItem name="roleName" label="Role Name" placeholder="Docter, Detective ..."/>
                <InputItem name="roleDesc" label="Role Description" placeholder="Summary of rules ..."/>
            </div>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        padding: 10,
    }
}

export default connect(
    state => ({
        showAddRoleView: state.library.showAddRoleView,
    })
)(AddRoleView)