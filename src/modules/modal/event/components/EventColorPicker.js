import React from 'react'

import { EventTextColors } from './EventConstants'
import EventColorDrag from './EventColorDrag';

export default function EventColorPicker(props) {
    return (
        <div className="event-color-picker">
            {EventTextColors.map(item => <EventColorDrag key={item.hexcode} item={item}/>)}
        </div>
    )
}