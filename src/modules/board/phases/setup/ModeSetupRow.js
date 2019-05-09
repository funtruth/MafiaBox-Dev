import React from 'react'
import _ from 'lodash'

import {
    difficultyType,
} from '../../../common/types'

import {
    Row,
    Body,
    Bubble,
} from '../../../components/Common';

function ModeSetupRow(props) {
    const { items, players, onDraft, onNewDraft } = props

    const sortedItems = _.groupBy(items, i => i.difficulty)
    const zones = _.toArray(difficultyType)

    const renderItem = (item) => {
        return (
            <Bubble
                key={item.key}
                bg="blue"
                icon="mdi mdi-file-document-outline"
                onClick={() => onDraft(item.key)}
            >
                {item.title}
            </Bubble>
        )
    }

    const renderZone = (item) => {
        const matchedItems = sortedItems[item.key] || []
        const noItems = !matchedItems.length

        return (
            <Body
                key={item.key}
                style={{flex: 1}}
                x="l"
            >
                {matchedItems.map(renderItem)}
                {noItems &&
                    <Bubble
                        bg="discord"
                        onClick={() => onNewDraft(players, item.key)}
                    >
                        new ...
                    </Bubble>
                }
            </Body>
        )
    }

    return (
        <Row style={{flex: 1}}>
            {zones.map(renderZone)}
        </Row>
    )
}

export default ModeSetupRow