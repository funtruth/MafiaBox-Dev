import React from 'react'

import { choiceMap } from '../../logic/defaults';

import {
    Body,
} from '../../components/Common';
import LogicView from '../../logic/LogicView';

export default function LogicField(props) {
    const { path } = props
    
    return (
        <Body>
            <LogicView
                path={path}
                vars={choiceMap}
            />
        </Body>
    )
}