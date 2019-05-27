import React from 'react'

import { PartTypes } from './EventConstants';

import EventRecipients from './EventRecipients'
import EventTextInput from './EventTextInput';
import EventPlaygroundDrop from './EventPlaygroundDrop'
import EventStringDragDrop from './EventStringDragDrop';
import EventFunctionDragDrop from './EventFunctionDragDrop';
import {
    Body,
} from '../../../components/Common';

export default function EventPlayground(props) {
    const { workspace, setWorkspace, setText, stringIndex } = props
    
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
                    <EventPlaygroundDrop key={index}>
                        <EventFunctionDragDrop
                            {...props}
                            item={item}
                            index={index}
                        />
                    </EventPlaygroundDrop>
                )
            default:
                return null
        }
    }

    return (
        <Body style={{flex: 0.65, borderRight: '1px solid #464646'}}>
            <EventRecipients {...props}/>
            <div className="-sep"/>
            <div
                className="event-playground-view"
                onClick={handleClick}
            >
                <div className="dashboard-section-title">Event Text</div>
                {/*stringArr.map(renderItem)*/}
            </div>
            <EventTextInput {...props}/>
        </Body>
    )
}