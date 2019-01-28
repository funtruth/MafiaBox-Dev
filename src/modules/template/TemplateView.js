import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import PageHeader from './components/PageHeader';
import FieldTemplateView from '../fields/FieldTemplateView';

class TemplateView extends React.Component {
    render() {
        const { boardType, fieldRepo } = this.props
        
        const pageInfo = _(fieldRepo)
            .filter(i => i.boardType === boardType)
            .sortBy(i => i.index)

        if (!pageInfo.length) return null

        return (
            <div className="page">
                <PageHeader/>
                <div className="page-content">
                    <FieldTemplateView
                        boardType={boardType}
                        pageInfo={pageInfo}
                    />
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        fieldRepo: state.field.fieldRepo,
    }),
)(TemplateView)