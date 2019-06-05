import React from 'react'

import {
    dropdownType,
    modalType,
} from '../../../common/types'

import {
    DropClick,
    Icon,
    Row,
    Tag,
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
                dropdown={dropdownType.dropString}
                params={{
                    path: [...path, 'events', eventKey, 'title'],
                }}
                style={{
                    flex: 0.3,
                }}
            >
                <Row>
                    <Text size="s" color={title ? 'whitish' : 'grey'}>
                        {title || 'Untitled'}
                    </Text>
                    <Icon color="darkgrey" icon="pencil" style={{marginLeft: 6}}></Icon>
                </Row>
            </DropClick>
            <DropClick
                modal={modalType.editLogic}
                params={{
                    path: [...path, 'events', eventKey, 'data'],
                }}
                style={{
                    marginLeft: 'auto',
                }}
            >
                <Tag
                    icon="pencil"
                    text="Edit logic"
                    bg="discord"
                />
            </DropClick>
        </Row>
    )
}

export default EventRow