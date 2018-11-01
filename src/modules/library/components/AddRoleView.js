import React from 'react'
import { connect } from 'react-redux'

class AddRoleView extends React.Component{
    render() {
        return (
            <div style={styles.container}>

            </div>
        )
    }
}

const styles = {
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'red',
    }
}

export default connect(
    state => ({
        roles: state.library.roles,
        roleId: state.library.roleId,
    })
)(AddRoleView)