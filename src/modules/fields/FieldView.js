import React from 'react'
import './field.css'
import { connect } from 'react-redux';

import { fieldType } from './defaults'

import CallField from './components/CallField'
import TextField from './components/TextField';
import NumberField from './components/NumberField';
import ImageField from './components/ImageField'
import UniqueTagField from './components/UniqueTagField';
import PlayerTagField from './components/PlayerTagField'
import PriorityField from './components/PriorityField'
import PropertyField from './components/PropertyField'
import LogicBoard from './components/LogicBoard';
import VariableField from './components/VariableField'

function FieldView(props) {
    const { pageKey, pageInfo, fieldMap, fieldRepo, path, subpath, updateSource, updatePage } = props
    const { boardType } = pageInfo

    const renderItem = (item) => {
        const fieldInfo = fieldRepo[item.key]
        const { key, data } = fieldInfo
        
        const props = {
            key,
            pageKey,
            fieldKey: key,
            value: pageInfo[key], //value related to the current page
            data, //data related to the field
            fieldInfo,
            vars: fieldInfo.vars || {},
            path: [...path, key],
            subpath,
            updateSource,
            updatePage,
        }
        
        switch(fieldInfo.fieldType) {
            case fieldType.text.key:
                return <TextField {...props}/>
            case fieldType.number.key:
                return <NumberField {...props}/>

            case fieldType.call.key:
                return <CallField {...props}/>
            case fieldType.image.key:
                return <ImageField {...props}/>
            case fieldType.logic.key:
                return <LogicBoard {...props}/>
            case fieldType.tag.key:
                return <UniqueTagField {...props}/>
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
    
    const fields = fieldMap[boardType] || []
    return (
        <>
            {fields.map((field, index) => {
                const item = fieldRepo[field]
                const { icon } = fieldType[item.fieldType]

                return (
                    <React.Fragment key={index}>
                        <div className="-sep"/>
                        <div className="field-label">
                            <i className={`field-icon ${icon}`} style={{ width: 16 }}></i>
                            {item.title}
                        </div>
                        {renderItem(item)}
                    </React.Fragment>
                )
            })}
            <div style={{ height: '30vh' }}></div>
        </>
    )
}

export default connect(
    state => ({
        fieldRepo: state.page.fieldRepo,
        fieldMap: state.page.fieldMap,
    }),
)(FieldView)