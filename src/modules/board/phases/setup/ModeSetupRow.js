import React from 'react'
import _ from 'lodash'

import {
    difficultyType,
} from '../../../common/types'

import { useOverflow } from '../../../hooks/Hooks'

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
        const [overflowRef, overflowed] = useOverflow(null)
        
        return (
            <div
                key={item.key}
                ref={overflowRef}
            >
                <Bubble
                    bg="blue"
                    icon="mdi mdi-file-document-outline"
                    onClick={() => onDraft(item.key)}
                    style={{
                        float: overflowed ? 'none' : 'left',
                    }}
                >
                    {item.title}
                </Bubble>
            </div>
        )
    }

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
                {matchedItems.map(renderItem)}
                {noItems &&
                    <Bubble
                        bg="discord"
                        onClick={() => onNewDraft(players, item.key)}
                        style={{
                            float: 'left',
                        }}
                    >
                        new ...
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