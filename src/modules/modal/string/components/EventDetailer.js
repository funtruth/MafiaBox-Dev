import React from 'react'
import EventColorPicker from './EventColorPicker';
import EventVarPicker from './EventVarPicker';
import EventFunctionPicker from './EventFunctionPicker';

export default function EventDetailer(props) {

    return (
        <div className="event-detailer">
            <EventColorPicker {...props}/>
            <div className="-sep"/>
            <EventFunctionPicker {...props}/>
            <div className="-sep"/>
            <EventVarPicker {...props}/>
        </div>
    )
}