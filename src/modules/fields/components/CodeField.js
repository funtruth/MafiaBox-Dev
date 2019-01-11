import React from 'react'

import {Controlled as CodeMirror} from 'react-codemirror2'
require('codemirror/mode/javascript/javascript')

class CodeField extends React.Component{
    render() {
        return (
            <CodeMirror
                value={this.props.code}
                options={{
                    mode: 'javascript',
                    theme: 'monokai',
                    lineNumbers: true
                }}
            />
        )
    }
}

export default CodeField