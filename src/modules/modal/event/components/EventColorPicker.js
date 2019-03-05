import React from 'react'

import { EventTextColors } from './EventConstants'
import EventColorDrag from './EventColorDrag';

export default function EventColorPicker(props) {
    return (
        <div className="event-color-picker">
            <div className="dashboard-section-title">Text Color</div>
            <div className="row"> 
                {EventTextColors.map(item => (
                    <EventColorDrag
                        {...props}
                        key={item}
                        item={item}
                    />
                ))}
            </div>
        </div>
    )
}