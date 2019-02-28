import React from 'react'
import { connect } from 'react-redux'
import './page.css'

import PageHeader from './components/PageHeader';
import PageAbstract from './components/PageAbstract'
import FieldView from '../fields/FieldView';

function PageView(props) {
    const { pageRepo, pageKey } = props
    const pageInfo = pageRepo[pageKey] || {}

    return (
        <div className="page">
            <PageHeader {...props}/>
            <div className="page-content">
                <PageAbstract {...props} pageInfo={pageInfo}/>
                <FieldView {...props} pageInfo={pageInfo}/>
            </div>
        </div>
    )
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    })
)(PageView)