import React from 'react'
import { connect } from 'react-redux'

import { LOGIC_TESTS } from '../../testhub/tests';
import { modalType } from '../../common/types';

import { getCode } from '../../logic/LogicEngine'
import { showModal } from '../../modal/ModalReducer'

import LogicView from '../../logic/LogicView';

function LogicBoard(props) {
    const { value, fieldInfo } = props
    const { vars } = fieldInfo

    let runCode = () => {
        const code = getCode(value)
        let { rss, write } = LOGIC_TESTS[0]
        // eslint-disable-next-line
        Function(`return ${code}`)()(rss, write)
        console.log('_runCode results', {rss, write})
    }

    let showCode = () => {
        const code = getCode(value)
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
            <LogicView
                {...props}
                logicKey=""
                parentKey=""
                childKeys={value.childKeys}
                vars={vars}
            />
        </div>
    )
}

export default connect(
    null,
    {
        showModal,
    }
)(LogicBoard)