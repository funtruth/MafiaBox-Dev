import React from 'react'

import '../monokai.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'

import {Controlled as CodeMirror} from 'react-codemirror2'
require('codemirror/mode/javascript/javascript')

class CodeField extends React.Component{
    render() {
        return (
            <CodeMirror
                value={this.props.code}
                options={{
                    ...this.props.options,
                    mode: 'javascript',
                    theme: 'monokai',
                    lineNumbers: true,
                    lineWrapping: true,
                }}
            />
        )
    }
}

export default CodeField