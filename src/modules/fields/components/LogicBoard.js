import React from 'react'
import { connect } from 'react-redux'

import { getCode, getParents } from '../../logic/LogicReducer'

import LogicBlock from '../../logic/LogicBlock'
import LogicArgs from '../../logic/components/LogicArgs';
import CodeField from './CodeField'

class LogicBoard extends React.Component{
    render() {
        const { fieldInfo, value } = this.props
        
        const parents = getParents(value)
        const code = this.props.getCode(fieldInfo, Object.keys(parents)[0], value)

        if (!value) return null
        
        return (
            <div className="logic-board">
                <LogicArgs vars={fieldInfo.vars}/>
                <div
                    style={{
                        margin: '8px 6px',
                    }}
                >
                    {Object.keys(parents).map((item, index) => (
                        <LogicBlock
                            {...this.props}
                            key={index}
                            value={value || {}}
                            index={item}
                            vars={fieldInfo.vars}
                        />
                    ))}
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

export default connect(
    null,
    {
        getCode,
    }
)(LogicBoard)