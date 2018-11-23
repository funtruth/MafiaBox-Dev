import React from 'react'
import './field.css'
import { connect } from 'react-redux';

import { fieldType } from './defaults'

import { updatePage } from '../page/PageReducer'

import InputField from './components/InputField'
import TagField from './components/TagField';
import PhaseTriggerField from './components/PhaseTriggerField';
import CodeField from './components/CodeField'
import LogicBoard from './components/LogicBoard';

class FieldView extends React.Component {
    _renderItem = (item) => {
        const { pageInfo, fieldRepo, updatePage } = this.props
        const fieldInfo = fieldRepo[item]
        const { fieldKey, data } = fieldInfo
        
        const props = {
            key: fieldKey,
            field: fieldKey,
            value: pageInfo[fieldKey],
            data,
            pageInfo,
            fieldInfo,
            updatePage,
        }

        if (!pageInfo[fieldKey] && fieldInfo.fieldDefault) {
            this.props.updatePage(pageInfo.pageKey, fieldKey, fieldInfo.fieldDefault)
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
            case fieldType.phaseTrigger:
                return <PhaseTriggerField {...props}/>
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