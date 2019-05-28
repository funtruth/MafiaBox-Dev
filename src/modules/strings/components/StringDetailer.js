import React from 'react'

import StringColorPicker from './StringColorPicker';
//import EventVarPicker from './EventVarPicker';
import { Body } from '../../components/Common';

export default function EventDetailer(props) {

    return (
        <Body style={{flex: 0.35}}>
            <StringColorPicker {...props}/>
            <div className="-sep"/>
        </Body>
    )
}