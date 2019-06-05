import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import { DEFAULT_ROLE_SETUP } from '../../defaults'

import { minMaxArray } from '../helpers';
import generatePushID from '../../../common/generatePushID';
import { updateGeneral } from '../../../page/PageReducer'

import {
    Body,
    Row,
    Text,
} from '../../../components/Common';
import ModeSetupRow from './ModeSetupRow';
import ModeSetupLabel from './ModeSetupLabels';
import RolePicker from './picker/RolePicker'

function ModeSetupView(props) {
    const { slate, path } = props
    const { playerNum, roleSetup } = slate
    
    const rows = minMaxArray(playerNum||{})

    const [draft, setDraft] = useState("")
    const draftRow = roleSetup && roleSetup[draft] && roleSetup[draft].players
    const onDraft = (setupKey) => {
        if (!roleSetup[setupKey]) return;
        setDraft(setupKey)
    }
    const onNewDraft = (players, difficulty) => {
        const setupKey = generatePushID('setup')
        props.updateGeneral({
            path: [...path, 'roleSetup', setupKey],
                update: {
                ...DEFAULT_ROLE_SETUP,
                key: setupKey,
                title: 'list',
                players,
                difficulty,
            }
        })
        setDraft(setupKey)
    }

    const [items, setItems] = useState([])
    useEffect(() => {
        setItems(_.groupBy(roleSetup, i => i.players))
    }, [roleSetup])
    
    return (
        <Body>
            <ModeSetupLabel/>
            {rows.map(item => (
                <Body key={item}>
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
                        <Text
                            size="s"
                            style={{
                                flex: 0.4,
                            }}
                        >
                            {`${item} players`}
                        </Text>
                        <ModeSetupRow
                            players={item}
                            items={items[item]}
                            onDraft={onDraft}
                            onNewDraft={onNewDraft}
                        />
                    </Row>
                    {item === draftRow &&
                        <RolePicker
                            modeKey={slate.key}
                            draftInfo={roleSetup[draft]}
                        />
                    }
                </Body>
            ))}
        </Body>
    )
}

export default connect(
    null,
    {
        updateGeneral,
    }
)(ModeSetupView)