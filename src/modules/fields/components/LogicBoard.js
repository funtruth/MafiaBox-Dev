import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import * as helpers from '../../common/helpers'
import { getCode } from '../../logic/LogicReducer'
import { pushCode, updateIfActive } from '../../code/CodeReducer'

import LogicBlock from '../../logic/LogicBlock'

class LogicBoard extends React.Component{
    _showCode(origin, value) {
        const { pageKey, fieldKey, pageInfo, fieldInfo } = this.props
        const code = this.props.getCode(origin, value)
        
        this.props.pushCode({
            pageKey: pageKey,
            source: pageInfo.title,
            fieldKey: fieldKey,
            subsource: fieldInfo.title,
            code,
            expanded: true,
        })
    }

    render() {
        const { pageKey, fieldKey, fieldInfo, value } = this.props
        
        const origin = _.findKey(value, i => !i.source)
        const vars = helpers.swapVarFormat(fieldInfo.vars, true)

        this.props.updateIfActive(pageKey, fieldKey, origin, value)
        
        if (!value) return null
        
        return (
            <div className="logic-board">
                <div className="row">
                    <div className="field-view-code" onClick={() => this._showCode(origin, value)}>
                        <i className="mdi mdi-code-tags" style={{ marginRight: 4 }}></i>
                        view code
                    </div>
                </div>
                <div style={{ margin: '0px 6px' }}>
                    <LogicBlock
                        {...this.props}
                        value={value}
                        indexKey={origin}
                        vars={vars}
                    />
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        updateRef: state.template.updateRef,
    }),
    {
        getCode,
        pushCode,
        updateIfActive,
    }
)(LogicBoard)