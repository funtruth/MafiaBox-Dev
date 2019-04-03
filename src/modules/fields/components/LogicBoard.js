import React from 'react'
import { connect } from 'react-redux'

import { LOGIC_TESTS } from '../../testhub/tests';

import { getCode } from '../../logic/LogicReducer'
import { showModal } from '../../modal/ModalReducer'

import LogicBlock from '../../logic/LogicBlock'
import { modalType } from '../../modal/types';

function LogicBoard(props) {
    const { value, vars } = props

    let runCode = () => {
        const code = props.getCode(value)
        let { rss, write } = LOGIC_TESTS[0]
        // eslint-disable-next-line
        Function(`return ${code}`)()(rss, write)
        console.log('_runCode results', {rss, write})
    }

    let showCode = () => {
        const code = props.getCode(value)
        props.showModal(modalType.showCode, {
            code,
        })
    }
    
    return (
        <div className="logic-board">
            <div className="row field-view-code">
                <div onClick={runCode} style={{ marginLeft: 'auto', marginRight: 16 }}>
                    <i className="mdi mdi-console-line" style={{ marginRight: 4 }}></i>
                    run code in console
                </div>
                <div onClick={showCode}>
                    <i className="mdi mdi-code-tags" style={{ marginRight: 4 }}></i>
                    view code
                </div>
            </div>
            <div style={{ margin: '0px 6px' }}>
                <LogicBlock
                    {...props}
                    indent={false}
                    showBorderLeft={true}
                    value={value}
                    parentValue=""
                    sourceValue=""
                    vars={vars}
                />
            </div>
        </div>
    )
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