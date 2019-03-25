import React from 'react'
import { connect } from 'react-redux'

function RoleHeader(props) {
    const { storyKey, storyRepo } = props
    const storyInfo = storyRepo[storyKey] || {}
    const { title } = storyInfo
    
    return (
        <div className="role-header">
            <div className="role-header-title">{title}</div>
        </div>
    )
}

export default connect(
    state => ({
        storyRepo: state.page.storyRepo,
    }),
)(RoleHeader)