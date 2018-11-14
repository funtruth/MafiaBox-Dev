import React from 'react'
import { fieldIcon } from '../defaults'

import {Controlled as CodeMirror} from 'react-codemirror2'
require('codemirror/mode/javascript/javascript')

class CodeBlock extends React.Component{
    _onChange = (editor, c, value)  => {
        const { pageInfo, field } = this.props
        const { pageKey } = pageInfo

        this.props.updatePage(pageKey, field, value)
    }

    render() {
        const { value, fieldInfo, field } = this.props

        return (
            <div>
                <div className="page-field-label">
                    <i className={`story-option ${fieldIcon.code}`} style={{ width: 16 }}></i>
                    {(fieldInfo && fieldInfo.fieldTitle) || field}
                </div>
                <CodeMirror
                    value={value}
                    options={{
                        mode: 'javascript',
                        theme: 'monokai',
                        lineNumbers: true
                    }}
                    onBeforeChange={this._onChange}
                />
            </div>
        )
    }
}

export default CodeBlock