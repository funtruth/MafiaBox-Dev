import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import { DEFAULT_ROLE_SETUP } from '../../defaults'

import { minMaxArray } from '../helpers';
import { genUID } from '../../../common/helpers';
import { updateGeneral } from '../../../page/PageReducer'

import {
    Body,
    Row,
    Text,
} from '../../../components/Common';
import ModeSetupRow from './ModeSetupRow';
import ModeSetupLabel from './ModeSetupLabels';
import ModeRolePicker from './ModeRolePicker'

function ModeSetupView(props) {
    const { modeKey, modeInfo } = props

    const { playerNum, roleSetup } = modeInfo
    const rows = minMaxArray(playerNum)

    const [draft, setDraft] = useState({})
    const onDraft = (setupKey) => {
        if (!roleSetup[setupKey]) return;
        setDraft(roleSetup[setupKey])
    }
    const onNewDraft = (players, difficulty) => {
        const setupKey = genUID('setup', roleSetup)
        props.updateGeneral(['modeRepo', modeKey, 'roleSetup', setupKey], {
            ...DEFAULT_ROLE_SETUP,
            key: setupKey,
            title: 'list',
            players,
            difficulty,
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
                        className="--basic-slide"
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
                            draft={draft}
                            onDraft={onDraft}
                            onNewDraft={onNewDraft}
                        />
                    </Row>
                    {item === draft.players &&
                        <ModeRolePicker draft={draft}/>
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