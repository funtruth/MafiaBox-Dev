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

class FieldView extends React.Component {
    _renderItem = (item) => {
        const { pageInfo, fieldRepo, updatePage } = this.props
        const fieldInfo = fieldRepo[item]
        const { fieldKey, data } = fieldInfo
        
        const props = {
            key: fieldKey,
            field: fieldKey,
            fieldKey,
            value: pageInfo[fieldKey],
            data,
            pageInfo,
            fieldInfo,
            updatePage,
        }

        //if the field has a default that hasn't been set, update
        if (!pageInfo[fieldKey] && fieldInfo.fieldType === fieldType.logic) {
            this.props.updatePage(pageInfo.pageKey, fieldKey, defaultLogic)
        }
        
        switch(fieldInfo.fieldType) {
            case fieldType.text:
                return <InputField {...props} inputType="text"/>
            case fieldType.number:
                return <InputField {...props} inputType="number"/>
            case fieldType.code:
                return <CodeField {...props}/>
            case fieldType.logic:
                return <LogicBoard {...props}/>
            case fieldType.tag:
                return <TagField {...props}/>
            case fieldType.property:
                return <PropertyField {...props}/>
            case fieldType.vars:
                return <VariableField {...props}/>
            default:
                return null
        }

    }

    render() {
        const { pageInfo } = this.props
        const { boardType } = pageInfo
        if (!boardType) return null
        
        const fields = this.props.fieldMap[boardType]
        if (!fields) return null

        return (
            <div>
                {fields.map(this._renderItem)}
            </div>
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