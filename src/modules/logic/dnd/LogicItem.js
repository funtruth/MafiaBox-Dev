import React from 'react'
import { DragSource } from 'react-dnd'

import {
    logicDNDType,
    dropdownType,
} from '../../common/types';
import { COLLECT_DRAG } from '../../modal/ModalDND'

import LogicType from '../components/LogicType';
import LogicOptions from '../components/LogicOptions'
import LogicParsed from '../components/LogicParsed';

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
    const { connectDragSource, logicItem, path } = props
    const { logicType, operatorType, source, byId } = logicItem

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
            <LogicParsed
                varKey={source}
                varRepo={byId}
                path={path}
                type={operatorType || logicType}
            />
        )        
    }

    return connectDragSource(
        <div>
            <Row>
                <LogicType {...props}/>
                {renderBody()}
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
