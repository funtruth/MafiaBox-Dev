import React, { useState } from 'react'
import { connect } from 'react-redux'

import ModeHeader from './components/ModeHeader';
import PhaseDiagram from './diagram/PhaseDiagram';
import ModeSetupView from './setup/ModeSetupView';

function ModeView(props) {
    const { match, modeRepo } = props
    const { params } = match
    const { modeKey } = params

    const [tab, setTab] = useState(0)

    const propsExt = {
        ...props,
        tab, setTab,
        modeKey,
        modeInfo: modeRepo[modeKey] || {},
    }
    console.log('ModeView console', modeRepo[modeKey])

    return (
        <>
            <ModeHeader {...propsExt}/>
            {tab === 0 && <PhaseDiagram {...propsExt}/>}
            {tab === 1 && <ModeSetupView {...propsExt}/>}
        </>
    )
}

export default connect(
    state => ({
        modeRepo: state.page.modeRepo,
    })
)(ModeView)