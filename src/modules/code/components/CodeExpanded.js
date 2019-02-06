import React from 'react'
import { connect } from 'react-redux'

import CodeField from './CodeField'

class CodeExpanded extends React.Component {
    _onCollapse = () => {
        this.props.expandCode(false)
    }

    render() {
        const { code } = this.props
        
        return (
            <div
                className="code-expanded"
                onClick={this._onCollapse}
            >
                <CodeField
                    code={code}
                    options={{
                        readOnly: 'nocursor',
                    }}
                />
            </div>
        )
    }
}

export default connect(
    null,
    {
        
    }
)(CodeExpanded)