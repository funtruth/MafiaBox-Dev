import React from 'react'

import EventRecipients from './EventRecipients'
import EventTextInput from './EventTextInput';
import EventStringDragDrop from './EventStringDragDrop';

export default function EventPlayground(props) {
    const { workspace, setWorkspace, setText, stringIndex, selectedEvent } = props
    const { stringArr } = selectedEvent

    let handleClick = (e) => {
        //if background is being clicked ...
        if (e.target.classList.contains('event-playground-view')) {
            //if an existing string is being editted ...
            if (stringIndex !== '') {
                //reset workspace.
                setWorkspace({
                    ...workspace,
                    stringIndex: '',
                })
                setText('')
            }
        }
    }

    return (
        <div className="event-playground" cancel-appclick="true">
            <div className="dashboard-section-title">Recipients</div>
            <EventRecipients {...props}/>
            <div className="-sep"/>
            <div className="dashboard-section-title">Event Text</div>
            <div
                className="event-playground-view"
                onClick={handleClick}
            >
                {stringArr.map((item, index) => (
                    <EventStringDragDrop
                        {...props}
                        key={index}
                        item={item}
                        index={index}
                    />
                ))}
            </div>
            <EventTextInput {...props}/>
        </div>
    )
}