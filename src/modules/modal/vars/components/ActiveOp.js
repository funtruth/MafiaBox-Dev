import React from 'react'

import { opType, opValueType } from './ops';

import ValueDrop from './ValueDrop'
import BasicOpDrop from './BasicOpDrop';

export default function ActiveOp(props) {
    let { opInfo, subpath, workspace, setWorkspace } = props
    let buttonText = '...'
    
    //if field has not been touched -> empty
    if (!opInfo) {
        return (
            <ValueDrop
                subpath={subpath}
                workspace={workspace}
                setWorkspace={setWorkspace}
            >
                {buttonText}
            </ValueDrop>
        )
    }

    switch(opInfo.opType) {
        case opType.NaN.key:
            return (
                <div className="empty-text">Drag Operation or Value Here</div>
            )
        case opType.value.key:
            switch(opInfo.opValueType) {
                case opValueType.constant.key:
                    buttonText = opInfo.value || buttonText
                    break
                case opValueType.variable.key:
                    buttonText = opInfo.value.key
                    break
                default:
            }

            return (
                <ValueDrop
                    opInfo={opInfo}
                    subpath={subpath}
                    workspace={workspace}
                    setWorkspace={setWorkspace}
                >
                    {buttonText}
                </ValueDrop>
            )
        case opType.basicOp.key:
            return (
                <BasicOpDrop
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
                </BasicOpDrop>
            )
        default:
            return null
    }
}