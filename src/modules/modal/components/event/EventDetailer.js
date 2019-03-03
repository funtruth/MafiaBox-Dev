import React from 'react'
import EventRecipients from './EventRecipients'

export default function EventDetailer(props) {

    return (
        <div className="dashboard-edit -y-p">
            <div className="dashboard-section-title">Colors</div>
            <EventRecipients {...props}/>
            <div className="-sep"/>
            <div className="dashboard-section-title">Functions</div>
            <EventRecipients {...props}/>
            <div className="-sep"/>
            <div className="dashboard-section-title">Variables</div>
            <EventRecipients {...props}/>
            <div className="-sep"/>
            <div className="dashboard-section-title">Recipients</div>
            <EventRecipients {...props}/>
        </div>
    )
}