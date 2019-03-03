import React from 'react'

import EventTextInput from './EventTextInput';
import EventPlaygroundDrag from './EventPlaygroundDrag';

export default function EventPlayground(props) {
    const { selectedItem } = props
    const { string } = selectedItem

    return (
        <div className="event-playground" cancel-appclick="true">
            <div className="dashboard-section-title">Event Text</div>
            <div className="event-playground-view">
                {string.map((item, index) => (
                    <EventPlaygroundDrag key={index}>
                        {item.string}
                    </EventPlaygroundDrag>
                ))}
            </div>
            <EventTextInput {...props}/>
        </div>
    )
}