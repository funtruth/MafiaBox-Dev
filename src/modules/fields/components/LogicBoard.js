import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { fieldIcon } from '../defaults'
import { defaultLogic } from '../../logic/types';

import { getCode } from '../../logic/LogicReducer'

import LogicBlock from '../../logic/LogicBlock'
import LogicArgs from '../../logic/components/LogicArgs';

import {Controlled as CodeMirror} from 'react-codemirror2'
require('codemirror/mode/javascript/javascript')

class LogicBoard extends React.Component{
    render() {
        const { fieldInfo, fieldKey, value } = this.props
        
        let children = {}

        //gather all keys that are children
        for (var logicKey in value) {
            if (value[logicKey].right) children[value[logicKey].right] = true
            if (value[logicKey].down) children[value[logicKey].down] = true
        }
        
        //gather all keys that are parents, set index to the first parent
        //TODO show variables in chronological order for dropdown PickVar
        const parents = _.pickBy(value, (i, key) => !children[key])
        const code = this.props.getCode(Object.keys(parents)[0], value)

        if (!value) return null
        
        return (
            <div className="field-item" style={{ marginBottom: 4 }}>
                <div className="page-field-label">
                    <i className={`story-option ${fieldIcon.logic}`} style={{ width: 16 }}></i>
                    {(fieldInfo && fieldInfo.fieldTitle) || fieldKey}
                </div>
                <div className="logic-board">
                    <LogicArgs {...this.props}/>
                    {Object.keys(parents).map((item, index) => (
                        <LogicBlock
                            {...this.props}
                            key={index}
                            value={value || defaultLogic}
                            index={item}
                            vars={fieldInfo.vars}
                        />
                    ))}
                    <CodeMirror
                        value={code}
                        options={{
                            mode: 'javascript',
                            theme: 'monokai',
                            lineNumbers: true
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    {
        getCode,
    }
)(LogicBoard)