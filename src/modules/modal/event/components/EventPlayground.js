import React from 'react'

import EventTextInput from './EventTextInput';

export default function EventPlayground(props) {
    return (
        <div className="event-playground border-right" cancel-appclick="true">
            <div className="dashboard-section-title">Event Text</div>
            <div className="dashboard-results">
            
            </div>
            <EventTextInput {...props}/>
        </div>
    )
}