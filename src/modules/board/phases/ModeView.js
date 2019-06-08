import React, { useState } from 'react'

import { usePath } from '../../hooks/Hooks';

import ModeHeader from './ModeHeader';
import ModeSetupView from './setup/ModeSetupView';
import ModePhaseView from '../mode/ModePhaseView';

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
            {tab === 0 && <ModePhaseView {...propsExt}/>}
            {tab === 1 && <ModeSetupView {...propsExt}/>}
        </>
    )
}