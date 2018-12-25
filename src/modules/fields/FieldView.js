import React from 'react'
import './field.css'
import { connect } from 'react-redux';

import { fieldType } from './defaults'
import { defaultLogic } from '../logic/types';

import { updatePage } from '../page/PageReducer'

import InputField from './components/InputField'
import TagField from './components/TagField';
import PropertyField from './components/PropertyField'
import CodeField from './components/CodeField'
import LogicBoard from './components/LogicBoard';
import VariableField from './components/VariableField'
import StringMaker from './components/StringMaker'

class FieldView extends React.Component {
    _renderItem = (item) => {
        const { pageInfo, fieldRepo } = this.props
        const fieldInfo = fieldRepo[item]
        const { fieldKey, data } = fieldInfo
        
        const props = {
            key: fieldKey,
            fieldKey,
            value: pageInfo[fieldKey],
            data,
            pageInfo,
            fieldInfo,
        }

        //if the field has a default that hasn't been set, update
        if (!pageInfo[fieldKey] && fieldInfo.fieldType === fieldType.logic.key) {
            this.props.updatePage(pageInfo.pageKey, fieldKey, defaultLogic)
        }
        
        switch(fieldInfo.fieldType) {
            case fieldType.text.key:
                return <InputField {...props} inputType="text"/>
            case fieldType.number.key:
                return <InputField {...props} inputType="number"/>
            case fieldType.code.key:
                return <CodeField {...props}/>
            case fieldType.logic.key:
                return <LogicBoard {...props}/>
            case fieldType.tag.key:
                return <TagField {...props}/>
            case fieldType.property.key:
                return <PropertyField {...props}/>
            case fieldType.vars.key:
                return <VariableField {...props}/>
            case fieldType.strings.key:
                return <StringMaker {...props}/>
            default:
                return null
        }

    }

    render() {
        const { pageInfo, fieldMap, fieldRepo } = this.props
        const { boardType } = pageInfo
        if (!boardType) return null
        
        const fields = fieldMap[boardType]
        if (!fields) return null

        return (
            fields.map((item, index) => {
                const fieldInfo = fieldRepo[item]
                return (
                    <div key={index} className="field-item" style={{ marginBottom: 4 }}>
                        <div className="page-field-label">
                            <i className={`story-option ${fieldType[fieldInfo.fieldType].icon}`} style={{ width: 16 }}></i>
                            {fieldInfo.fieldTitle}
                        </div>
                        {this._renderItem(item)}
                    </div>
                )
            })
        )
    }
}

export default connect(
    state => ({
        fieldMap: state.field.fieldMap,
        fieldRepo: state.field.fieldRepo,
    }),
    {
        updatePage,
    }
)(FieldView)