import React from 'react'
import { connect } from 'react-redux'

class CodeCollapsed extends React.Component {
    _onExpand = () => {
        this.props.expandCode(true)
    }

    render() {
        return (
            <div
                className="code-collapsed"
                onClick={this._onExpand}
            >
            </div>
        )
    }
}

export default connect(
    null,
    {
        
    }
)(CodeCollapsed)