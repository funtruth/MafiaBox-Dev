import React from 'react'
import { connect } from 'react-redux'

class TemplateView extends React.Component{
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
        flex: 1,
    }
}

export default connect(
    state => ({
        roles: state.library.roles,
        roleId: state.library.roleId,
    })
)(TemplateView)