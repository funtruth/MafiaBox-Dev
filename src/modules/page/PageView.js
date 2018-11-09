import React from 'react'
import './page.css'
import { connect } from 'react-redux'

import { updatePage } from './PageReducer'

import PageHeader from './components/PageHeader';
import PageAbstract from './components/PageAbstract'
import InputField from './components/InputField'
import AddNewField from './components/AddNewField'

class PageView extends React.Component {
    render() {
        const { pageKey, pageRepo } = this.props
        const pageInfo = pageRepo[pageKey]
        
        if (!pageInfo) return null

        return (
            <div className="page">
                <PageHeader/>
                <div className="page-content">
                    <PageAbstract pageInfo={pageInfo} updatePage={this.props.updatePage}/>
                    <InputField pageInfo={pageInfo} updatePage={this.props.updatePage} field="roleDesc"/>
                    <InputField pageInfo={pageInfo} updatePage={this.props.updatePage} field="roleHelo"/>
                    <AddNewField/>
                </div>
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