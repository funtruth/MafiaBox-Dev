import React from 'react'
import './field.css'
import { connect } from 'react-redux';

import { fieldType } from './defaults'

import { updateField } from './FieldReducer'

import TemplateTagView from './templates/TemplateTagView';
import TemplateTitle from './templates/TemplateTitle';

class FieldTemplateView extends React.Component {
    _renderItem = (fieldKey) => {
        const { fieldRepo, updateField } = this.props
        const fieldInfo = fieldRepo[fieldKey]
        
        const props = {
            key: fieldKey,
            fieldInfo,
            updateField,
        }
        
        switch(fieldInfo.fieldType) {
            case fieldType.text:
                return null
            case fieldType.number:
                return null
            case fieldType.code:
                return null
            case fieldType.logic:
                return null
            case fieldType.tag:
                return <TemplateTagView {...props}/>
            case fieldType.phaseTrigger:
                return null
            default:
                return null
        }

    }

    render() {
        const { pageInfo,
            fieldRepo, updateField } = this.props

        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {pageInfo.map((item, index) => (
                    <div key={item}>
                        <div className="highlight" style={{ padding: '2px 6px', borderRadius: 2 }}>
                            <TemplateTitle
                                fieldInfo={fieldRepo[item]}
                                updateField={updateField}
                            />
                            {this._renderItem(item)}
                        </div>
                        <div style={{
                            height: 1,
                            backgroundColor: '#666',
                            marginTop: 8,
                            marginBottom: 8,
                        }}/>
                    </div>
                ))}
                <div className="add-button">
                    Add Field
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        fieldRepo: state.field.fieldRepo,
    }),
    {
        updateField,
    }
)(FieldTemplateView)