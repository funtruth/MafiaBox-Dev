import React from 'react'
import './field.css'
import { connect } from 'react-redux';
import _ from 'lodash'

import { fieldType } from './defaults'

import CallField from './components/CallField'
import TextField from './components/TextField';
import NumberField from './components/NumberField';
import TagField from './components/TagField';
import PlayerTagField from './components/PlayerTagField'
import PriorityField from './components/PriorityField'
import PropertyField from './components/PropertyField'
import LogicBoard from './components/LogicBoard';
import VariableField from './components/VariableField'

import FooterSpacer from './components/FooterSpacer'

class FieldView extends React.Component {
    _renderItem = (item) => {
        const { pageKey, pageInfo, fieldRepo, path, updateSource, updatePage } = this.props
        const fieldInfo = fieldRepo[item.key]
        const { key, data } = fieldInfo
        
        const props = {
            key,
            pageKey,
            fieldKey: key,
            value: pageInfo[key],
            data,
            fieldInfo,
            path: [...path, key],
            updateSource,
            updatePage,
        }
        
        switch(fieldInfo.fieldType) {
            case fieldType.call.key:
                return <CallField {...props}/>
            case fieldType.text.key:
                return <TextField {...props}/>
            case fieldType.number.key:
                return <NumberField {...props}/>
            case fieldType.logic.key:
                return <LogicBoard {...props} pageInfo={pageInfo}/>
            case fieldType.tag.key:
                return <TagField {...props}/>
            case fieldType.playerTag.key:
                return <PlayerTagField {...props}/>
            case fieldType.priority.key:
                return <PriorityField {...props}/>
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
        
        const fields = _(fieldRepo)
            .filter(i => i.boardType === boardType)
            .sortBy(i => i.index)
            .value()

        return (
            <>
                {fields.map((item, index) => {
                    const { icon } = fieldType[item.fieldType]

                    return (
                        <React.Fragment key={index}>
                            <div className="-sep"/>
                            <div className="field-label">
                                <i className={`field-icon ${icon}`} style={{ width: 16 }}></i>
                                {item.title}
                            </div>
                            {this._renderItem(item)}
                        </React.Fragment>
                    )
                })}
                <FooterSpacer/>
            </>
        )
    }
}

export default connect(
    state => ({
        fieldRepo: state.field.fieldRepo,
    }),
)(FieldView)