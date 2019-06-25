import React from 'react'
import _ from 'lodash'
import './field.css'
import { useSelector } from 'react-redux';

import { fieldType } from './types'

import { IS_PUBLISHED } from '../common/arrows';

import GameChoiceField from './components/GameChoiceField'
import GeneralTagField from './components/GeneralTagField'
import ImageField from './components/ImageField'
import LogicField from './components/LogicField';
import NumberField from './components/NumberField';
import PriorityField from './components/PriorityField'
import TimerField from './components/TimerField'
import TitleField from './components/TitleField'
import UniqueTagField from './components/UniqueTagField';
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
        
        switch(fieldInfo.type) {
            case fieldType.title.key:
                return <TitleField {...props}/>
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
            case fieldType.image.key:
                return <ImageField {...props}/>
            case fieldType.gameChoices.key:
            case fieldType.gameChoiceOverride.key:
                return <GameChoiceField {...props}/>
            //TODO
            case fieldType.timer.key:
                return <TimerField {...props}/>

            default:
                return null
        }
    }
    
    const fields = _.filter(fieldMap[slate.board])
    return (
        <>
            {fields.map((field, index) => {
                const item = fieldRepo[field]
                const { icon } = fieldType[item.type] || {}

                return (
                    <Body
                        key={index}
                        sizes={['s', 'z']}
                        style={{borderLeft: '1px dashed #666', marginBottom: 20}}
                    >
                        {item.title && 
                            <Tag
                                size="l"
                                icon={icon}
                                text={item.title}
                                bg="transparent"
                                bold
                            />
                        }
                        {renderItem(item)}
                    </Body>
                )
            })}
            <div style={{height: '30vh'}}></div>
        </>
    )
}