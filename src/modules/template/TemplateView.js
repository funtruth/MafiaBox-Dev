import React from 'react'
import './template.css'
import { connect } from 'react-redux'

import { updateField } from '../fields/FieldReducer'

import PageHeader from './components/PageHeader';
import FieldTemplateView from '../fields/FieldTemplateView';

class TemplateView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }
    render() {
        const { fieldMapKey, fieldMap } = this.props
        const pageInfo = fieldMap[fieldMapKey]
        
        if (!pageInfo) return null

        return (
            <div className="page">
                <PageHeader/>
                <div className="page-content">
                    <FieldTemplateView
                        fieldMapKey={fieldMapKey}
                        pageInfo={pageInfo}
                    />
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        fieldMap: state.field.fieldMap,
    }),
    {
        updateField,
    }
)(TemplateView)