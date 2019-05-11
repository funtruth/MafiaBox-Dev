import React from 'react'
import { connect } from 'react-redux'
import './logic.css'

import { LOGIC_TESTS } from '../testhub/tests';
import { modalType } from '../common/types';
import { stateByPath } from '../common/helpers';

import { getCode } from './LogicEngine'
import { showModal } from '../modal/ModalReducer'
import { updateGeneral } from '../page/PageReducer'

import {
    Body,
    Row,
    Tag,
} from '../components/Common';
import LogicBlock from './dnd/LogicBlock';

function LogicView(props) {
    const { page, path, vars } = props
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
        <Body>
            <Row x="r">
                <Tag
                    icon="mdi mdi-console-line"
                    onClick={runCode}
                >
                    run code in console
                </Tag>
                <Tag
                    icon="mdi mdi-code-tags"
                    onClick={showCode}
                >
                    view code
                </Tag>
            </Row>
            <LogicBlock
                {...props}
                logicRepo={logicRepo}
                vars={vars}
            />
        </Body>
    )
}

export default connect(
    state => ({
        page: state.page,
    }),
    {
        showModal,
        updateGeneral,
    }
)(LogicView)