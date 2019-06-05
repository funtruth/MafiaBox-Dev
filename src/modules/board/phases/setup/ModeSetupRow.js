import React from 'react'
import _ from 'lodash'

import {
    difficultyType,
} from '../../../common/types'

import {
    Row,
    Bubble,
} from '../../../components/Common';
import ModeSetupItem from './ModeSetupItem'

function ModeSetupRow(props) {
    const { items, players, onDraft, onNewDraft } = props

    const sortedItems = _.groupBy(items, i => i.difficulty)
    const zones = _.toArray(difficultyType)

    const renderZone = (item) => {
        const matchedItems = sortedItems[item.key] || []
        const noItems = !matchedItems.length

        return (
            <div
                key={item.key}
                x="l"
                style={{
                    display: 'inline',
                    flexBasis: '20%',
                    minWidth: 0,
                    float: 'left',
                }}
            >
                {matchedItems.map(item => (
                    <ModeSetupItem
                        {...item}
                        key={item.key + item.title}
                        row={item.key}
                        onDraft={onDraft}
                    />
                ))}
                {noItems &&
                    <Bubble
                        bg="discord"
                        onClick={() => onNewDraft(players, item.key)}
                        icon="file-document-edit-outline"
                        style={{
                            float: 'left',
                        }}
                    >
                    </Bubble>
                }
            </div>
        )
    }

    return (
        <Row style={{flex: 1}}>
            {zones.map(renderZone)}
        </Row>
    )
}

export default ModeSetupRow