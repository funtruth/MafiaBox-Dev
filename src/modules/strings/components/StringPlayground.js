import React from 'react'

import { ITEM_TYPE } from '../types';

import StringInput from './StringInput';
import StringDragDrop from '../dnd/StringDragDrop'
import StringSideDrop from '../dnd/StringSideDrop'
import { Body, Row } from '../../components/Common';

export default function StringPlayground(props) {
    const { stringRepo, stringMap, setText, stringIndex } = props
    
    let handleClick = (e) => {
        //if background is being clicked ...
        if (e.target.classList.contains('event-playground-view')) {
            //if an existing string is being editted ...
            if (stringIndex !== '') {
                setText('')
            }
        }
    }

    const renderItem = (stringKey, index) => {
        const item = stringRepo[stringKey]

        switch(item.type) {
            case ITEM_TYPE.string:
                return (
                    <div style={{position: 'relative'}} key={index}>
                        <StringSideDrop
                            left
                            index={index}
                            move={() => console.log("left'")}
                        />
                        <StringSideDrop
                            right
                            index={index}
                            move={() => console.log("rit'")}
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
        <Body style={{flex: 0.65, borderRight: '1px solid #464646'}}>
            <div className="dashboard-section-title">Event Text</div>
            <Row sizes={['xxs', 's']}>
                {stringMap.map(renderItem)}
            </Row>
            <StringInput {...props}/>
        </Body>
    )
}