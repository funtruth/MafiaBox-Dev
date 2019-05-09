import React from 'react'
import _ from 'lodash'

import {
    difficultyType,
} from '../../../common/types'

import {
    Body,
    Bubble,
    Row,
    Text,
} from '../../../components/Common';

function ModeSetupLabel(props) {
    const zones = _.toArray(difficultyType)

    const renderZone = (item) => {
        return (
            <Body
                key={item.key}
                x="l"
                style={{
                    flex: 1,
                    borderLeft: '2px solid #333',
                }}
            >
                <Bubble
                    bg={item.color}
                >
                    {item.key}
                </Bubble>
            </Body>
        )
    }

    return (
        <Row sizes={['xs', 'xl']} y="c">
            <Text style={{flex: 0.4}}># of Players</Text>
            <Row style={{flex: 1}}>{zones.map(renderZone)}</Row>
        </Row>
    )
}

export default ModeSetupLabel