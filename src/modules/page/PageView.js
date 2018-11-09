import React from 'react'
import './page.css'
import { connect } from 'react-redux'

import { updatePage } from './PageReducer'

import PageHeader from './components/PageHeader';
import PageAbstract from './components/PageAbstract'
import InputField from './components/InputField'

class PageView extends React.Component {
    render() {
        const { pageKey, pageMap } = this.props
        const pageInfo = pageMap[pageKey]
        
        if (!pageInfo) return null

        return (
            <div className="page">
                <PageHeader/>
                <div className="page-content">
                    <PageAbstract pageInfo={pageInfo} updatePage={this.props.updatePage}/>
                    <InputField pageInfo={pageInfo} updatePage={this.props.updatePage} field="roleDesc"/>
                    <InputField pageInfo={pageInfo} updatePage={this.props.updatePage} field="roleHelo"/>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        pageMap: state.page.pageMap,
    }),
    {
        updatePage,
    }
)(PageView)