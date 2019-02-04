import React from 'react'
import './code.css'
import _ from 'lodash'
import { connect } from 'react-redux'

import { showModal, popModalTo, updateTopModal } from './ModalReducer'
import { updatePageByPath, saveAllPriorities } from '../page/PageReducer'
import { updateFunction } from '../functions/FunctionReducer'

import { codeType } from './types'

import CodeChild from './components/CodeChild'

import LogicMirror from './logic/LogicMirror'

class CodeView extends React.Component {
    _renderItem(props) {
        props.showModal = this.props.showModal

        switch(props.key) {
            case codeType.logicMirror:
                return <LogicMirror {...props}/>
            default:
                return null
        }
    }

    render() {
        const { modalKeys } = this.props
        if (!modalKeys.length) return null
        
        return (
            modalKeys.map((item, index) => {
                let props = Object.assign({}, item)

                return (
                    <CodeChild {...props} key={index}>
                        {this._renderItem(props)}
                    </CodeChild>
                )
            })
        )
    }
}

export default connect(
    state => ({
        codeKeys: state.code.codeKeys,
    }),
    {
        showModal,
        updatePageByPath,
        updateFunction,
        saveAllPriorities,
        popModalTo,
        updateTopModal,
    }
)(CodeView)