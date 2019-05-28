import React from 'react'
import _ from 'lodash'

import { ITEM_TYPE } from '../types';

import StringInput from './StringInput';
import StringDragDrop from '../dnd/StringDragDrop'
import StringSideDrop from '../dnd/StringSideDrop'
import { Body, Row } from '../../components/Common';

export default function StringPlayground(props) {
    const { stringRepo, stringMap, path, updateGeneral, setActiveKey } = props
    
    let handleClick = (e) => {
        //if background is being clicked ...
        if (e.target.classList.contains('string-playground-click')) {
            setActiveKey('')
        }
    }

    const move = (oldIndex, newIndex) => {
        const mapClone = _.cloneDeep(stringMap)
        
        const [removed] = mapClone.splice(oldIndex, 1)
        mapClone.splice(newIndex > oldIndex ? newIndex - 1 : newIndex, 0, removed)

        updateGeneral([...path, 'byIndex'], mapClone)
    }

    const renderItem = (stringKey, index) => {
        const item = stringRepo[stringKey]
        if (!item) return null;

        switch(item.type) {
            case ITEM_TYPE.string:
                return (
                    <div style={{position: 'relative'}} key={stringKey}>
                        <StringSideDrop
                            left
                            index={index}
                            move={(oldIndex) => move(oldIndex, index)}
                        />
                        <StringSideDrop
                            right
                            index={index}
                            move={(oldIndex) => move(oldIndex, index + 1)}
                        />
                        <StringDragDrop
                            {...props}
                            item={item}
                            index={index}
                        />
                    </div>
                )
            /*case ITEM_TYPE.variable:
                return (
                    <EventPlaygroundDrop key={index}>
                        <EventFunctionDragDrop
                            {...props}
                            item={item}
                            index={index}
                        />
                    </EventPlaygroundDrop>
                )*/
            default:
                return null
        }
    }

    return (
        <Body style={{flex: 1, borderRight: '1px solid #464646'}}>
            <div className="dashboard-section-title">Event Text</div>
            <div className="string-playground-click" style={{flex: 1}} onClick={handleClick}>
                <Row sizes={['xxs', 's']} style={{marginBottom: 'auto'}}>
                    {(stringMap||[]).map(renderItem)}
                </Row>
            </div>
            <StringInput {...props}/>
        </Body>
    )
}