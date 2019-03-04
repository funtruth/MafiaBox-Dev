import React from 'react'

import { PartTypes } from './EventConstants';

import EventRecipients from './EventRecipients'
import EventTextInput from './EventTextInput';
import EventPlaygroundDrop from './EventPlaygroundDrop'
import EventStringDragDrop from './EventStringDragDrop';
import EventFunctionDragDrop from './EventFunctionDragDrop';

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

    let renderItem = (item, index) => {
        switch(item.partType) {
            case PartTypes.string:
                return (
                    <EventPlaygroundDrop key={index}>
                        <EventStringDragDrop
                            {...props}
                            item={item}
                            index={index}
                        />
                    </EventPlaygroundDrop>
                )
            case PartTypes.function:
                return (
                    <EventFunctionDragDrop
                        {...props}
                        key={index}
                        item={item}
                        index={index}
                    />
                )
            default:
                return null
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
                {stringArr.map(renderItem)}
            </div>
            <EventTextInput {...props}/>
        </div>
    )
}