import React from 'react'

import {
    dropdownType,
    modalType,
} from '../../../common/types'

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
            <DropClick
                modal={modalType.editLogic}
                params={{
                    path: [...path, 'events', eventKey],
                }}
                style={{
                    flex: 0.4,
                }}
            >
                <Text size="s" color={title ? 'whitish' : 'grey'}>
                    {title || 'Untitled'}
                </Text>
            </DropClick>
        </Row>
    )
}

export default EventRow