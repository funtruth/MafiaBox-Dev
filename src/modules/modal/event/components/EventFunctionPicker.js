import React from 'react'
import _ from 'lodash'

import { EventFunctions } from './EventConstants';

import EventFunctionDrag from './EventFunctionDrag';

export default function EventFunctionPicker(props) {
    const functions = _.toArray(EventFunctions)

    return (
        <div className="event-color-picker">
            {functions.map(item => (
                <EventFunctionDrag
                    key={item.key}
                    item={item}
                />
            ))}       
        </div>
    )
}