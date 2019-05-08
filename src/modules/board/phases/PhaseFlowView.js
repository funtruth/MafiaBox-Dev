import React from 'react'

import PhaseFlowHeader from './components/PhaseFlowHeader';
import PhaseDiagram from './components/PhaseDiagram';

export default function PhaseFlowView(props) {
    const { match } = props
    const { params } = match
    const { modeKey } = params

    return (
        <>
            <PhaseFlowHeader {...props} modeKey={modeKey}/>
            <PhaseDiagram modeKey={modeKey}/>
        </>
    )
}