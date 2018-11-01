import React from 'react'
import { connect } from 'react-redux'

class DetailView extends React.Component{
    render() {
        if (!this.props.roleId) return null
        return (
            <div style={styles.container}>

            </div>
        )
    }
}

const styles = {
    container: {
        flex: 0.75,
    }
}

export default connect(
    state => ({
        roles: state.library.roles,
        roleId: state.library.roleId,
    })
)(DetailView)