import React from 'react'
import './page.css'
import './monokai.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import { connect } from 'react-redux'

import { updatePage } from './PageReducer'

import PageHeader from './components/PageHeader';
import PageAbstract from './components/PageAbstract'
import FieldView from '../fields/FieldView';
import AddNewField from './components/AddNewField'

import {Controlled as CodeMirror} from 'react-codemirror2'
require('codemirror/mode/javascript/javascript')

class PageView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }
    render() {
        const { pageKey, pageRepo } = this.props
        const pageInfo = pageRepo[pageKey]
        
        if (!pageInfo) return null

        return (
            <div className="page">
                <PageHeader/>
                <div className="page-content">
                    <PageAbstract pageInfo={pageInfo} updatePage={this.props.updatePage}/>
                    <FieldView pageInfo={pageInfo}/>
                    <AddNewField/>
                </div>
                <CodeMirror
                    value={this.state.value}
                    options={{
                        mode: 'javascript',
                        theme: 'monokai',
                        lineNumbers: true
                    }}
                    onBeforeChange={(editor, data, value) => this.setState({value})}
                />
            </div>
        )
    }
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    }),
    {
        updatePage,
    }
)(PageView)