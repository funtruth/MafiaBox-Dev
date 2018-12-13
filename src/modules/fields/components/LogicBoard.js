import React from 'react'
import { fieldIcon } from '../defaults'
import _ from 'lodash'

import LogicBlock from '../../fields/logic/LogicBlock'
import { defaultLogic } from '../logic/types';

class LogicBoard extends React.Component{
    render() {
        const { fieldInfo, field, value } = this.props
        
        let parents
        let children = {}

        //gather all keys that are children
        for (var logicKey in value) {
            if (value[logicKey].right) children[value[logicKey].right] = true
            if (value[logicKey].down) children[value[logicKey].down] = true
        }
        
        //gather all keys that are parents, set index to the first parent
        parents = _.pickBy(value, (i, key) => !children[key])
        
        if (!value) return null
        
        return (
            <div className="field-item" style={{ marginBottom: 4 }}>
                <div className="page-field-label">
                    <i className={`story-option ${fieldIcon.logic}`} style={{ width: 16 }}></i>
                    {(fieldInfo && fieldInfo.fieldTitle) || field}
                </div>
                <div className="logic-board">
                    {Object.keys(parents).map((item, index) => (
                        <LogicBlock
                            {...this.props}
                            key={index}
                            value={value || defaultLogic}
                            index={item}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default LogicBoard