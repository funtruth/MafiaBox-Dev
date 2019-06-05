import React from 'react'
import _ from 'lodash'

import {
    Body,
} from '../../../components/Common';
import EventHeader from './EventHeader';
import EventRow from './EventRow'

export default function EventView(props) {
    const { slate } = props
    const { events } = slate || {}

    const items = _.toArray(events)

    return (
        <Body>
            <EventHeader {...props}/>
            {items.map(item => (
                <EventRow
                    {...props}
                    key={item.key}
                    item={item}
                />
            ))}
        </Body>
    )
}