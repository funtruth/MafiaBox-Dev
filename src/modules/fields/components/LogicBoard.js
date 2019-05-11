import React from 'react'
import { connect } from 'react-redux'

import { LOGIC_TESTS } from '../../testhub/tests';
import { modalType } from '../../common/types';

import { getCode } from '../../logic/LogicEngine'
import { showModal } from '../../modal/ModalReducer'

import LogicView from '../../logic/LogicView';
import { stateByPath } from '../../common/helpers';

function LogicBoard(props) {
    const { page, path } = props
    const logicRepo = stateByPath(path, page)

    let runCode = () => {
        const code = getCode(logicRepo)
        let { rss, write } = LOGIC_TESTS[0]
        // eslint-disable-next-line
        Function(`return ${code}`)()(rss, write)
        console.log('_runCode results', {rss, write})
    }

    let showCode = () => {
        const code = getCode(logicRepo)
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
                path={path}
                logicRepo={logicRepo}
                childKeys={logicRepo.childKeys}
            />
        </div>
    )
}

export default connect(
    state => ({
        page: state.page,
    }),
    {
        showModal,
    }
)(LogicBoard)