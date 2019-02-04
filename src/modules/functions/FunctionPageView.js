import React from 'react'
import { connect } from 'react-redux'

import PageHeader from '../page/components/PageHeader';
import PageAbstract from '../page/components/PageAbstract'
import FieldView from '../fields/FieldView';

class PageFunctionView extends React.Component {
    render() {
        const { pageKey, functionRepo } = this.props
        const pageInfo = functionRepo[pageKey] || {}

        return (
            <div className="page">
                <PageHeader {...this.props}/>
                <div className="page-content">
                    <PageAbstract
                        {...this.props}
                        pageInfo={pageInfo}
                    />
                    <FieldView
                        {...this.props}
                        pageInfo={pageInfo}
                    />
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        functionRepo: state.functions.functionRepo,
    }),
)(PageFunctionView)