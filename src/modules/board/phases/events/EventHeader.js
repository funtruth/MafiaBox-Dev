import React from 'react'

import { DEFAULT_EVENT_LISTENER } from '../../../common/defaults'

import generatePushID from '../../../common/generatePushID';

import {
    Row,
    Text,
    Tag,
} from '../../../components/Common';

export default function EventHeader(props) {
    const { path } = props

    const handleCreate = () => {
        const eventKey = generatePushID()('event')
        props.updateGeneral({
            path: [...path, 'events', eventKey],
                update: {
                ...DEFAULT_EVENT_LISTENER,
                key: eventKey,
            }
        })
    }

    return (
        <Row className="--slide-bottom" sizes={['xs', 'xl']} bg="blackish" y="c">
            <Text style={{flex: 0.3}}>Event</Text>
            <Text style={{flex: 0.5}}>Location</Text>
            <Text style={{flex: 0.5}}>Change</Text>
            <Tag
                onClick={handleCreate}
                icon="mdi mdi-calendar-plus"
            >
                Create
            </Tag>
        </Row>
    )
}