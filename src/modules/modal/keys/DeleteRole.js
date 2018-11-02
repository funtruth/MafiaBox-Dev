import React from 'react'
import { connect } from 'react-redux'

class CloseWindow extends React.Component {
    render() {
        return (
            <div class="delete-role">
                <div className="modal-title"></div>
            </div>
        )
    }
}

export default connect(
    
)(CloseWindow)