import React from 'react'

import CodeField from './CodeField'

class CodeExpanded extends React.Component {
    _onCollapse = () => {
        this.props.toggleCode()
    }

    render() {
        const { source, subsource, code } = this.props
        
        return (
            <div className="code-expanded">
                <div className="code-title" onClick={this._onCollapse}>
                    <div className="code-source">{source}</div>
                    <div className="code-subsource">{subsource}</div>
                </div>
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

export default CodeExpanded