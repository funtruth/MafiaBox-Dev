import React from 'react'

import { Body } from '../../components/Common';
import LogicView from '../../logic/LogicView';

export default function LogicField({path}) {
    return (
        <Body>
            <LogicView path={path}/>
        </Body>
    )
}