import React from 'react'

import { mathType } from './types';

import ValueDrop from './ValueDrop'
import BasicOpDrop from './BasicOpDrop';

export default function ActiveOp(props) {
    let { assign, subpath, workspace, setWorkspace } = props
    let buttonText = '...'
    
    //if field has not been touched -> empty
    if (!assign) {
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

    switch(assign.mathType) {
        case mathType.NaN.key:
            return (
                <div className="empty-text">Drag Operation or Value Here</div>
            )
        case mathType.value.key:
            return (
                <ValueDrop
                    assign={assign}
                    subpath={subpath}
                    workspace={workspace}
                    setWorkspace={setWorkspace}
                >
                    {buttonText}
                </ValueDrop>
            )
        case mathType.operation:
            return (
                <BasicOpDrop
                    subpath={subpath}
                    workspace={workspace}
                    setWorkspace={setWorkspace}
                >
                    <ActiveOp
                        assign={assign.left}
                        subpath={[...subpath, 'left']}
                        workspace={workspace}
                        setWorkspace={setWorkspace}
                    />
                    <div className="basic-op-op">{assign.mathOperatorType.char}</div>
                    <ActiveOp
                        assign={assign.right}
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