import React from 'react'

import { mathType } from '../../common/types';

import ValueDrop from './ValueDrop'
import BasicOpDrop from './BasicOpDrop';

export default function ActiveOp(props) {
    let { assign, subpath, workspace, setWorkspace } = props
    let buttonText = '...'
    
    //if field has not been touched -> empty
    if (!assign) {
        return (
            <ValueDrop
                assign={{}}
                subpath={subpath}
                workspace={workspace}
                setWorkspace={setWorkspace}
            >
                {buttonText}
            </ValueDrop>
        )
    }

    switch(assign.mathType) {
        case mathType.number:
        case mathType.variable:
            return (
                <ValueDrop
                    assign={assign}
                    subpath={subpath}
                    workspace={workspace}
                    setWorkspace={setWorkspace}
                >
                    {assign.value}
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
                    <div className="basic-op-op">
                        {assign.mathOperatorType.char}
                    </div>
                    <ActiveOp
                        assign={assign.right}
                        subpath={[...subpath, 'right']}
                        workspace={workspace}
                        setWorkspace={setWorkspace}
                    />
                </BasicOpDrop>
            )
        default:
            return <div className="empty-text">Drag Operation or Value Here</div>
    }
}