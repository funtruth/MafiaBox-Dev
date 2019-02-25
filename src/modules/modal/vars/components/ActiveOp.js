import React from 'react'

import { opType, opValueType } from './ops';

import ValueDroppable from './ValueDroppable'
import BasicOpDroppable from './BasicOpDroppable';

export default function ActiveOp(props) {
    let { opInfo, subpath, workspace, setWorkspace } = props
    let buttonText = '...'
    
    //if field has not been touched -> empty
    if (!opInfo) {
        return (
            <ValueDroppable
                subpath={subpath}
                workspace={workspace}
                setWorkspace={setWorkspace}
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
                workspace={workspace}
                setWorkspace={setWorkspace}
            >
                {buttonText}
            </ValueDroppable>
        )
    }

    return (
        <BasicOpDroppable
            subpath={subpath}
            workspace={workspace}
            setWorkspace={setWorkspace}
        >
            <ActiveOp
                opInfo={opInfo.left}
                subpath={[...subpath, 'left']}
                workspace={workspace}
                setWorkspace={setWorkspace}
            />
            <div className="basic-op-op">{opInfo.basicOpType.char}</div>
            <ActiveOp
                opInfo={opInfo.right}
                subpath={[...subpath, 'right']}
                workspace={workspace}
                setWorkspace={setWorkspace}
            />
        </BasicOpDroppable>
    )
}