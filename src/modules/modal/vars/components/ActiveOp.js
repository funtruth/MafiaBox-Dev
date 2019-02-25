import React from 'react'

import { updateSourceType } from '../../../common/types'
import { opType, opValueType } from './ops';
import { dropdownType } from '../../../dropdown/types'

import ValueDroppable from './ValueDroppable'
import BasicOpDroppable from './BasicOpDroppable';

export default function ActiveOp(props) {
    let { opInfo, subpath, playground, setPlayground } = props
    let buttonText = '...'
    
    //if field has not been touched -> empty
    if (!opInfo) {
        return (
            <ValueDroppable
                subpath={subpath} 
                playground={playground}
                setPlayground={setPlayground}
            >
                {buttonText}
            </ValueDroppable>
        )
    }

    /*if field is value opType
        => check opValueType for buttonText
    */
    if (opInfo.opType === opType.value.key) {
        switch(opInfo.opValueType) {
            case opValueType.constant.key:
                buttonText = opInfo.value
                break
            case opValueType.variable.key:
                buttonText = opInfo.value.key
                break
            default:
        }

        return (
            <ValueDroppable
                subpath={subpath} 
                playground={playground}
                setPlayground={setPlayground}
            >
                {buttonText}
            </ValueDroppable>
        )
    }

    return (
        <BasicOpDroppable
            subpath={subpath}
            playground={playground}
            setPlayground={setPlayground}
        >
            <ActiveOp
                opInfo={opInfo.left}
                subpath={[...subpath, 'left']}
                playground={playground}
                setPlayground={setPlayground}
            />
            <div
                className="basic-op-op app-onclick"
                menu-type={dropdownType.changeOp}
                app-onclick-props={JSON.stringify({
                    path: ['attach', 'assign'],
                    subpath,
                    currentValue: opInfo,
                    updateSource: updateSourceType.topModal,
                })}
            >
                {opInfo.basicOpType.char}
            </div>
            <ActiveOp
                opInfo={opInfo.right}
                subpath={[...subpath, 'right']}
                playground={playground}
                setPlayground={setPlayground}
            />
        </BasicOpDroppable>
    )
}