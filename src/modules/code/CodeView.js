import React from 'react'
import './code.css'
import { connect } from 'react-redux'

import { removeCodeAtIndex } from './CodeReducer'

import CodeCollapsed from './components/CodeCollapsed'
import CodeExpanded from './components/CodeExpanded'

class CodeView extends React.Component {
    render() {
        const { codeKeys } = this.props
        if (codeKeys.length < 1) {
            return null
        }

        return (
            codeKeys.map((item, index) => {
                let newProps = item

                newProps.removeCode = () => this.props.removeCodeAtIndex(index)

                return (
                    <div className="code-view" key={index}>
                        {item.expanded ? <CodeExpanded {...newProps}/> : <CodeCollapsed {...newProps}/>}
                    </div>
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
        removeCodeAtIndex,
    }
)(CodeView)