import React from 'react'
import { DragSource } from 'react-dnd'

import { logicDNDType } from '../common/types';
import { COLLECT_DRAG } from '../modal/ModalDND'

import LogicType from './components/LogicType';
import LogicOptions from './components/LogicOptions'
import LogicPanels from './components/LogicPanels';

import {
    Row,
} from '../components/Common';

const itemSource = {
    beginDrag(props) {
        const { logicKey, index } = props
        return {
            logicKey, index,
        }
    }
}

function LogicBlock(props) {
    const { connectDragSource } = props

    return connectDragSource(
        <div>
            <Row>
                <LogicType {...props}/>
                <LogicPanels {...props}/>
                <LogicOptions {...props}/>
            </Row>
        </div>
    );
    //const rng = helpers.genUID('rng')
}

export default DragSource(
    logicDNDType.item,
    itemSource,
    COLLECT_DRAG,
)(LogicBlock);
