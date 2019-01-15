import React from 'react'
import './string.css'

import { screenType } from './types'

import StringDashboard from './components/StringDashboard'
import StringEdit from './components/StringEdit'

class StringView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nav: screenType.dashboard,
        }
    }

    navigate = (screen) => {
        this.setState({
            nav: screen,
        })
    }

    render() {
        switch(this.state.nav) {
            case screenType.dashboard:
                return <StringDashboard navigate={this.navigate}/>
            case screenType.edit:
                return <StringEdit navigate={this.navigate}/>
            default:
                return null
        }
    }
}

export default StringView