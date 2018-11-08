import React from 'react'
import { Route, withRouter } from 'react-router-dom'

import ModalMenu from './ModalMenu'
import FlowBasic from './FlowBasic'
import FlowTarget from './FlowTarget'
import FlowPhase from './FlowPhase'

class FlowModal extends React.Component {
    render() {
        return (
            <div className="flow-modal-menu">
                <ModalMenu/>
                <div>
                    <Route exact path="/flow/basic" component={FlowBasic}/>
                    <Route exact path="/flow/target" component={FlowTarget}/>
                    <Route exact path="/flow/phaseChange" component={FlowPhase}/>
                </div>
            </div>
        )
    }
}

export default withRouter(FlowModal)