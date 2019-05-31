import React from 'react'
import './field.css'
import { connect } from 'react-redux';

import { fieldType } from './types'

import CallField from './components/CallField'
import TextField from './components/TextField';
import NumberField from './components/NumberField';
import ImageField from './components/ImageField'
import UniqueTagField from './components/UniqueTagField';
import GeneralTagField from './components/GeneralTagField'
import LogicField from './components/LogicField';

import GameChoiceField from './components/GameChoiceField'
import GameChoiceOverrideField from './components/GameChoiceOverrideField'
import TimerField from './components/TimerField'

import PriorityField from './components/PriorityField'
import VariableField from './components/VariableField'

function FieldView(props) {
    const { pageKey, pageInfo, fieldMap, fieldRepo,
        published, path, subpath, updatePage } = props
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
            disabled: published,
            path: [...path, key],
            subpath,
            updatePage,
        }
        
        switch(fieldInfo.fieldType) {
            case fieldType.text.key:
                return <TextField {...props}/>
            case fieldType.number.key:
                return <NumberField {...props}/>
            case fieldType.uniqueTag.key:
                return <UniqueTagField {...props}/>
            case fieldType.priority.key:
                return <PriorityField {...props}/>
            case fieldType.generalTag.key:
                return <GeneralTagField {...props}/>
            case fieldType.logic.key:
                return <LogicField {...props}/>
            //TODO
            case fieldType.gameChoices.key:
                return <GameChoiceField {...props}/>
            case fieldType.gameChoiceOverride.key:
                return <GameChoiceOverrideField {...props}/>
            case fieldType.timer.key:
                return <TimerField {...props}/>

            case fieldType.call.key:
                return <CallField {...props}/>
            case fieldType.image.key:
                return <ImageField {...props}/>
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
                const { icon } = fieldType[item.fieldType] || ""

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