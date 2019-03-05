import React from 'react'

import './monokai.css'
import 'codemirror/lib/codemirror.css'

import {Controlled as CodeMirror} from 'react-codemirror2'
require('codemirror/mode/javascript/javascript')

export default function CodeField(props) {
    return (
        <CodeMirror
            value={props.code}
            options={{
                ...props.options,
                mode: 'javascript',
                theme: 'monokai',
                lineNumbers: true,
                lineWrapping: true,
            }}
        />
    )
}