import React from 'react'
import EventColorPicker from './EventColorPicker';

export default function EventDetailer(props) {

    return (
        <div className="event-detailer">
            <div className="dashboard-section-title">Colors</div>
            <EventColorPicker {...props}/>
            <div className="-sep"/>
            <div className="dashboard-section-title">Functions</div>
            
            <div className="-sep"/>
            <div className="dashboard-section-title">Variables</div>
            
        </div>
    )
}