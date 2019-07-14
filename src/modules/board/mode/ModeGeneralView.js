import React from 'react'

import { Body } from '../../components/Common';
import ModeGameStateView from './ModeGameStateView'
import ModePages from './ModePages';

export default function ModeGeneralView({
    path,
    slate
}){
    return (
        <Body x="l">
            <ModeGameStateView path={path} slate={slate}/>
            <ModePages path={path} slate={slate}/>
        </Body>
    )
}