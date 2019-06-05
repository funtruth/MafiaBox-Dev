import React, { useState } from 'react'

import { usePath } from '../../hooks/Hooks';

import ModeHeader from './ModeHeader';
import PhaseDiagram from './diagram/PhaseDiagram';
import ModeSetupView from './setup/ModeSetupView';
import EventView from './events/EventView';

export default function ModeView({match}) {
    const { pageKey } = match.params

    const [tab, setTab] = useState(0)
    const slate = usePath(['pageRepo', pageKey])

    const propsExt = {
        tab, setTab,
        slate,
        path: ['pageRepo', pageKey],
    }
    console.log('ModeView console', slate)

    return (
        <>
            <ModeHeader {...propsExt}/>
            {tab === 0 && <PhaseDiagram {...propsExt}/>}
            {tab === 1 && <ModeSetupView {...propsExt}/>}
            {tab === 2 && <EventView {...propsExt}/>}
        </>
    )
}