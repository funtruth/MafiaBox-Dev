import React from 'react'
import { connect } from 'react-redux'
import './page.css'

import PageHeader from './components/PageHeader';
import PageAbstract from './components/PageAbstract'
import FieldView from '../fields/FieldView';

function PageView(props) {
    const { pageRepo, path } = props

    const mapKey = path[0]
    const pageKey = path[2]

    const pageInfo = (pageRepo[mapKey] && pageRepo[mapKey].byId && pageRepo[mapKey].byId[pageKey]) || {}
    console.log("PageView console", pageInfo)
    
    return (
        <div className="page">
            <PageHeader {...props} pageInfo={pageInfo}/>
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