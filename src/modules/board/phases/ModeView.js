import React, { useState } from 'react'

import ModeHeader from './components/ModeHeader';
import PhaseDiagram from './diagram/PhaseDiagram';

export default function ModeView(props) {
    const { match } = props
    const { params } = match
    const { modeKey } = params

    const [tab, setTab] = useState(0)

    return (
        <>
            <ModeHeader modeKey={modeKey} tab={tab} setTab={setTab}/>
            {tab === 0 && <PhaseDiagram modeKey={modeKey}/>}
        </>
    )
}