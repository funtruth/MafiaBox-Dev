import React from 'react'

import StringInput from './StringInput';
import StringDragDrop from '../dnd/StringDragDrop'
import StringSideDrop from '../dnd/StringSideDrop'
import { Body, Row, Separator, Text } from '../../components/Common';

export default function StringPlayground(props) {
    const { stringRepo, stringMap, setActiveKey } = props
    
    let handleClick = (e) => {
        //if background is being clicked ...
        if (e.target.classList.contains('string-playground-click')) {
            setActiveKey('')
        }
    }

    const renderItem = (stringKey, index) => {
        const item = stringRepo[stringKey]
        if (!item) return null;

        return (
            <div key={stringKey} style={{position: 'relative'}}>
                <StringSideDrop
                    left
                    index={index}
                    move={(oldIndex) => props.moveString(oldIndex, index)}
                    drop={(item) => props.dropString(item, index)}
                />
                <StringSideDrop
                    right
                    index={index}
                    move={(oldIndex) => props.moveString(oldIndex, index + 1)}
                    drop={(item) => props.dropString(item, index + 1)}
                />
                <StringDragDrop
                    {...props}
                    item={item}
                    index={index}
                />
            </div>
        )
    }

    return (
        <Body style={{flex: 0.65}}>
            <Text>Text</Text>
            <div className="string-playground-click" style={{flex: 1}} onClick={handleClick}>
                <Row sizes={['xxs', 's']} style={{marginBottom: 'auto'}}>
                    {(stringMap||[]).map(renderItem)}
                </Row>
            </div>
            <Separator></Separator>
            <StringInput {...props}/>
        </Body>
    )
}