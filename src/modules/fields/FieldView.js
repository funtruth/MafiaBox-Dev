import React from 'react'
import './field.css'
import { connect } from 'react-redux';
import _ from 'lodash'

import { fieldType } from './defaults'
import { defaultLogic } from '../logic/types';

import { updatePageByPath } from '../page/PageReducer'

import TextField from './components/TextField';
import NumberField from './components/NumberField';
import TagField from './components/TagField';
import PlayerTagField from './components/PlayerTagField'
import PropertyField from './components/PropertyField'
import CodeField from './components/CodeField'
import LogicBoard from './components/LogicBoard';
import VariableField from './components/VariableField'

class FieldView extends React.Component {
    _renderItem = (item) => {
        const { pageKey, pageInfo, fieldRepo, updatePageByPath } = this.props
        const fieldInfo = fieldRepo[item.key]
        const { fieldKey, data } = fieldInfo
        
        const props = {
            key: fieldKey,
            pageKey,
            fieldKey,
            value: pageInfo[fieldKey],
            data,
            pageInfo,
            fieldInfo,
            updatePageByPath,
        }

        //if the field has a default that hasn't been set, update
        if (!pageInfo[fieldKey] && fieldInfo.fieldType === fieldType.logic.key) {
            this.props.updatePageByPath(pageInfo.pageKey, fieldKey, defaultLogic)
        }
        
        switch(fieldInfo.fieldType) {
            case fieldType.text.key:
                return <TextField {...props}/>
            case fieldType.number.key:
                return <NumberField {...props}/>
            case fieldType.code.key:
                return <CodeField {...props}/>
            case fieldType.logic.key:
                return <LogicBoard {...props}/>
            case fieldType.tag.key:
                return <TagField {...props}/>
            case fieldType.playerTag.key:
                return <PlayerTagField {...props}/>
            case fieldType.property.key:
                return <PropertyField {...props}/>
            case fieldType.vars.key:
                return <VariableField {...props}/>
            default:
                return null
        }

    }

    render() {
        const { pageInfo, fieldRepo } = this.props
        const { boardType } = pageInfo
        if (!boardType) return null
        
        let fields = _.filter(fieldRepo, i => i.boardType === boardType)
        fields = _.sortBy(fields, i => i.index)
        if (!fields.length) return null

        return (
            fields.map((item, index) => {
                return (
                    <div key={index}>
                        <div className="-sep"/>
                        <div className="field-label">
                            <i className={`field-icon ${fieldType[item.fieldType].icon}`} style={{ width: 16 }}></i>
                            {item.title}
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
        fieldRepo: state.field.fieldRepo,
    }),
    {
        updatePageByPath,
    }
)(FieldView)