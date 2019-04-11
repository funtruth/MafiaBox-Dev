import React from 'react'
import './storm.css'

import PhaseFlowHeader from './components/PhaseFlowHeader';
import PhaseFlowDiagram from './components/PhaseFlowDiagram';

export default function PhaseFlowView(props) {
    const { match } = props
    const { params } = match
    const { storyKey } = params

    return (
        <>
            <PhaseFlowHeader {...props} storyKey={storyKey}/>
            <PhaseFlowDiagram {...props} storyKey={storyKey}/>
        </>
    )
}