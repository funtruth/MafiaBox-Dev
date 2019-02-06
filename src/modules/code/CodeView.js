import React from 'react'
import './code.css'
import { connect } from 'react-redux'

import { toggleCodeAtIndex, removeCodeAtIndex } from './CodeReducer'

import CodeCollapsed from './components/CodeCollapsed'
import CodeExpanded from './components/CodeExpanded'

class CodeView extends React.Component {
    render() {
        const { codeKeys } = this.props
        if (codeKeys.length < 1) {
            return null
        }

        return (
            <div className="code-view">
                {codeKeys.map((item, index) => {
                    let newProps = item

                    newProps.toggleCode = () => this.props.toggleCodeAtIndex(index)
                    newProps.removeCode = () => this.props.removeCodeAtIndex(index)

                    return (
                        <React.Fragment key={index}>
                            {item.expanded ? <CodeExpanded {...newProps}/> : <CodeCollapsed {...newProps}/>}
                        </React.Fragment>
                    )
                })}
            </div>
        )
    }
}

export default connect(
    state => ({
        codeKeys: state.code.codeKeys,
    }),
    {
        toggleCodeAtIndex,
        removeCodeAtIndex,
    }
)(CodeView)