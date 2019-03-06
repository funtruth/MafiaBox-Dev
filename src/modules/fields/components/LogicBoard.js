import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import { LOGIC_TESTS } from '../../testhub/tests';

import * as helpers from '../../common/helpers'
import { getCode } from '../../logic/LogicReducer'
import { showModal } from '../../modal/ModalReducer'

import LogicBlock from '../../logic/LogicBlock'
import { modalType } from '../../modal/types';

class LogicBoard extends React.Component {
    _runCode(origin, value) {
        const code = this.props.getCode(origin, value)
        let { rss, write } = LOGIC_TESTS[0]
        // eslint-disable-next-line
        Function(`return ${code}`)()(rss, write)
        console.log('_runCode results', {rss, write})
    }

    _showCode(origin, value) {
        const code = this.props.getCode(origin, value)
        this.props.showModal(modalType.showCode, {
            code,
        })
    }

    render() {
        const { value, vars: attachVars } = this.props
        
        const origin = ""
        const vars = helpers.swapVarFormat(attachVars, true)
        
        return (
            <div className="logic-board">
                <div className="row field-view-code">
                    <div onClick={() => this._runCode(origin, value)} style={{ marginLeft: 'auto', marginRight: 16 }}>
                        <i className="mdi mdi-console-line" style={{ marginRight: 4 }}></i>
                        run code in console
                    </div>
                    <div onClick={() => this._showCode(origin, value)}>
                        <i className="mdi mdi-code-tags" style={{ marginRight: 4 }}></i>
                        view code
                    </div>
                </div>
                <div style={{ margin: '0px 6px' }}>
                    <LogicBlock
                        {...this.props}
                        indent={false}
                        showBorderLeft={true}
                        value={value}
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
        showModal,
        getCode,
    }
)(LogicBoard)