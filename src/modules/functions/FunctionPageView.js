import React from 'react'
import { connect } from 'react-redux'

import PageHeader from '../page/components/PageHeader';
import PageAbstract from '../page/components/PageAbstract'
import FieldView from '../fields/FieldView';

function PageFunctionView(props) {
    const { pageKey, functionRepo } = props
    const pageInfo = functionRepo[pageKey] || {}

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
        functionRepo: state.functions.functionRepo,
    }),
)(PageFunctionView)