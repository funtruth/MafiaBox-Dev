import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

class NestedDropdown extends React.Component{
    render() {
        const { childInfo } = this.props
        const { pageX, pageY } = childInfo

        let menuStyle = {
            top: pageY,
            left: pageX,
        }

        const { pageRepo } = this.props

        return (
            <div className="drop-down-menu" style={menuStyle}>
            
            </div>
        )
    }
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    })
)(NestedDropdown)