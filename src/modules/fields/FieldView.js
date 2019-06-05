import React from 'react'
import './field.css'
import { useSelector } from 'react-redux';

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
import { IS_PUBLISHED } from '../common/arrows';
import Icon from '../components/Icon';

export default function FieldView(props) {
    const { path, slate, updatePage } = props
    const { fieldMap, fieldRepo } = useSelector(state => state.page)

    const renderItem = (item) => {
        const fieldInfo = fieldRepo[item.key]
        const { key, data } = fieldInfo
        
        const props = {
            key,
            pageKey: slate.key,
            fieldKey: key,
            value: slate[key], //value related to the current page
            data, //data related to the field
            fieldInfo,
            disabled: IS_PUBLISHED(slate),
            path: [...path, key],
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
            default:
                return null
        }
    }
    
    const fields = fieldMap[slate.board] || []
    return (
        <>
            {fields.map((field, index) => {
                const item = fieldRepo[field]
                const { icon } = fieldType[item.fieldType] || ""

                return (
                    <React.Fragment key={index}>
                        <div className="-sep"/>
                        <div className="field-label">
                            <Icon icon={icon}/>
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