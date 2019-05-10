import React from 'react'

import LogicType from './components/LogicType';
import LogicOptions from './components/LogicOptions'
import LogicPanels from './components/LogicPanels';

import {
    Row,
} from '../components/Common';

export default function LogicBlock(props) {
    //const rng = helpers.genUID('rng')
    return (
        <Row>
            <LogicType {...props}/>
            <LogicPanels {...props}/>
            <LogicOptions {...props}/>
        </Row>
    )
}