import React from 'react'
import EventColorPicker from './EventColorPicker';
import EventVarPicker from './EventVarPicker';
import EventFunctionPicker from './EventFunctionPicker';
import { Body } from '../../../components/Common';

export default function EventDetailer(props) {

    return (
        <Body style={{flex: 0.35}}>
            <EventColorPicker {...props}/>
            <div className="-sep"/>
            <EventFunctionPicker {...props}/>
            <div className="-sep"/>
            <EventVarPicker {...props}/>
        </Body>
    )
}