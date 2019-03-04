import React from 'react'
import EventColorPicker from './EventColorPicker';
import EventVarPicker from './EventVarPicker';
import EventFunctionPicker from './EventFunctionPicker';

export default function EventDetailer(props) {

    return (
        <div className="event-detailer">
            <div className="dashboard-section-title">Text Color</div>
            <EventColorPicker {...props}/>
            <div className="-sep"/>
            <div className="dashboard-section-title">Functions</div>
            <EventFunctionPicker {...props}/>
            <div className="-sep"/>
            <div className="dashboard-section-title">Variables</div>
            <EventVarPicker {...props}/>
        </div>
    )
}