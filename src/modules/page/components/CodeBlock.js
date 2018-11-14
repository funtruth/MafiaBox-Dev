import React from 'react'

import {Controlled as CodeMirror} from 'react-codemirror2'
require('codemirror/mode/javascript/javascript')

class CodeBlock extends React.Component{
    render() {
        if (!this.props.visible) return null
        return (
            <div className="code-block">
                <CodeMirror
                    value={this.props.value}
                    options={{
                        mode: 'javascript',
                        theme: 'monokai',
                        lineNumbers: true
                    }}
                    onBeforeChange={this.props.updateCode}
                />
            </div>
        )
    }
}

export default CodeBlock