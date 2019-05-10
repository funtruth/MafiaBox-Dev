import React from 'react'
import _ from 'lodash'

import { dropdownType } from '../../../common/types'

import {
    DropClick,
    Row,
    Text,
} from '../../../components/Common';

function EventRow(props) {
    const { item, path } = props
    const { title, key: eventKey } = item
    return (
        <Row
            className="--slide-bottom"
            sizes={['xxs', 'xl']}
            bg="charcoal"
            y="c"
            style={{
                border: '1px solid #333',
                borderRadius: 4,
            }}
        >
            <DropClick
                dropdown={dropdownType.editTitle}
                params={{
                    path: [...path, 'events', eventKey],
                    attach: item,
                }}
                style={{
                    flex: 0.4,
                }}
            >
                <Text size="s" color={title ? 'whitish' : 'grey'}>
                    {title || 'Untitled'}
                </Text>
            </DropClick>
            <Text style={{flex: 0.8}}>Event location</Text>
        </Row>
    )
}

export default EventRow