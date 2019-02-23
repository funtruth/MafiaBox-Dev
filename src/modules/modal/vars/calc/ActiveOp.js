import React from 'react'

import { opType, opValueType } from './ops';
import { dropdownType } from '../../../dropdown/types'

export default function ActiveOp(props) {
    let { opInfo, subpath } = props
    let buttonText = '...'
    
    //if field has not been touched -> empty
    if (!opInfo) {
        return (
            <div
                className="basic-op-bubble app-onclick"
                menu-type={dropdownType.pickOp}
                app-onclick-props={JSON.stringify({
                    subpath,
                })}
            >
                {buttonText}
            </div>
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
            <div
                className="basic-op-bubble app-onclick"
                menu-type={dropdownType.pickOp}
                app-onclick-props={JSON.stringify({
                    subpath,
                })}
            >
                {buttonText}
            </div>
        )
    }

    return (
        <div className="basic-op">
            <ActiveOp opInfo={opInfo.left} subpath={[...subpath, 'left']}/>
            <div
                className="basic-op-op app-onclick"
                menu-type={dropdownType.changeOp}
                app-onclick-props={JSON.stringify({
                    subpath,
                    currentValue: opInfo,
                })}
            >
                {opInfo.basicOpType.char}
            </div>
            <ActiveOp opInfo={opInfo.right} subpath={[...subpath, 'right']}/>
        </div>
    )
}