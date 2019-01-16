import React from 'react'
import './string.css'
import { connect } from 'react-redux'

import { screenType } from './types'

import StringDashboard from './components/StringDashboard'
import StringEdit from './components/StringEdit'
import StringUpdate from './components/StringUpdate'

class StringView extends React.Component {
    render() {
        switch(this.props.stringView) {
            case screenType.dashboard:
                return <StringDashboard/>
            case screenType.edit:
                return <StringEdit/>
            case screenType.update:
                return <StringUpdate/>
            default:
                return null
        }
    }
}

export default connect(
    state => ({
        stringView: state.string.stringView,
    })
)(StringView)