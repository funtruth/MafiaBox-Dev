import React from 'react'
import './string.css'

import StringDashboard from './StringDashboard'
import StringCreate from './StringCreate'
import StringEdit from './StringEdit'

const SCREEN_DASHBOARD = 'screen/dashboard'
const SCREEN_CREATE = 'screen/create'
const SCREEN_EDIT = 'screen/edit'

class StringView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nav: SCREEN_DASHBOARD,
        }
    }

    navigate = (screen) => {
        this.setState({
            nav: screen,
        })
    }

    render() {
        switch(this.state.nav) {
            case SCREEN_DASHBOARD:
                return <StringDashboard navigate={this.navigate}/>
            case SCREEN_CREATE:
                return <StringCreate navigate={this.navigate}/>
            case SCREEN_EDIT:
                return <StringEdit navigate={this.navigate}/>
            default:
                return null
        }
    }
}

export default StringView