import React from 'react'
import _ from 'lodash'
import { DragSource } from 'react-dnd'

import {
    logicDNDType,
    dropdownType,
} from '../../common/types';
import { COLLECT_DRAG } from '../../modal/ModalDND'

import LogicType from '../components/LogicType';
import LogicOptions from '../components/LogicOptions'
import LogicPanels from '../components/LogicPanels';

import {
    DropClick,
    LogicButton,
    Row,
} from '../../components/Common';

const itemSource = {
    beginDrag(props) {
        const { parentKey, index } = props
        return {
            parentKey, index,
        }
    }
}

function LogicItem(props) {
    const { connectDragSource, logicItem, scope, logicKey, rootPath, path } = props
    const { logicType, source, byId, vars } = logicItem
    
    const scopedVars = _.filter(vars, i => !i.scope || scope.includes(logicKey))

    const renderBody = () => { 
        if (!logicType) {
            return (
                <DropClick
                    dropdown={dropdownType.pickLogic}
                    params={{
                        path,
                    }}
                >
                    <LogicButton color="grey">
                        select logic ...
                    </LogicButton>
                </DropClick>
            )
        }

        return (
            <LogicPanels
                varKey={source}
                varRepo={byId}
                scopedVars={scopedVars}
                rootPath={rootPath}
                path={path}
                logicItem={logicItem}
            />
        )        
    }

    return connectDragSource(
        <div>
            <Row y="t">
                <LogicType {...props}/>
                <Row y="c">
                    {renderBody()}
                </Row>
                <LogicOptions {...props}/>
            </Row>
        </div>
    );
}

export default DragSource(
    logicDNDType.item,
    itemSource,
    COLLECT_DRAG,
)(LogicItem);
