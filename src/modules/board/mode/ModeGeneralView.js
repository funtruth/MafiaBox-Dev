import React from 'react'

import { Body } from '../../components/Common';
import ModeGameStateView from './ModeGameStateView'
import ModePhases from './ModePhases';

export default function ModeGeneralView({
    path,
    slate
}){
    return (
        <Body x="l">
            <ModeGameStateView path={path} slate={slate}/>
            <ModePhases path={path} slate={slate}/>
        </Body>
    )
}