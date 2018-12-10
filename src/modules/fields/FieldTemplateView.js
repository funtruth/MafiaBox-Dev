import React from 'react'
import './field.css'
import { connect } from 'react-redux';

import { fieldType } from './defaults'

import { updateField } from './FieldReducer'

import InputField from './templates/InputField'
import TagField from './templates/TagField';
import PhaseTriggerField from './templates/PhaseTriggerField';
import CodeField from './templates/CodeField'
import LogicBoard from './templates/LogicBoard';
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
                return <InputField {...props} inputType="number"/>
            case fieldType.code:
                return <CodeField {...props}/>
            case fieldType.logic:
                return <LogicBoard {...props}/>
            case fieldType.tag:
                return <TagField {...props}/>
            case fieldType.phaseTrigger:
                return <PhaseTriggerField {...props}/>
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
                        <TemplateTitle
                            fieldInfo={fieldRepo[item]}
                            updateField={updateField}
                        />
                        {this._renderItem(item)}
                        <div style={{
                            height: 0.75,
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