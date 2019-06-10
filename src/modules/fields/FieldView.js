import React from 'react'
import './field.css'
import { useSelector } from 'react-redux';

import { fieldType } from './types'

import { IS_PUBLISHED } from '../common/arrows';

import TextField from './components/TextField';
import NumberField from './components/NumberField';
import ImageField from './components/ImageField'
import UniqueTagField from './components/UniqueTagField';
import GeneralTagField from './components/GeneralTagField'
import LogicField from './components/LogicField';
import GameChoiceField from './components/GameChoiceField'
import TimerField from './components/TimerField'
import PriorityField from './components/PriorityField'
import { Body, Tag } from '../components/Common';

export default function FieldView(props) {
    const { path, slate, updateGeneral } = props
    const { fieldMap, fieldRepo } = useSelector(state => state.page)
    
    const renderItem = (item) => {
        const fieldInfo = fieldRepo[item.key]
        const { key, data } = fieldInfo
        
        const props = {
            key,
            fieldKey: key,
            value: slate[key], //value related to the current page
            data, //data related to the field
            fieldInfo,
            disabled: IS_PUBLISHED(slate),
            path: [...path, key],
            updateGeneral,
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
            case fieldType.gameChoiceOverride.key:
                return <GameChoiceField {...props}/>
            case fieldType.timer.key:
                return <TimerField {...props}/>

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
                    <Body
                        key={index}
                        sizes={['s', 'z']}
                        style={{borderLeft: '1px dashed #666', marginBottom: 20}}
                    >
                        <Tag size="l" icon={icon} text={item.title} bg="transparent" bold></Tag>
                        {renderItem(item)}
                    </Body>
                )
            })}
            <div style={{height: '30vh'}}></div>
        </>
    )
}