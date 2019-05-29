import React, { useState } from 'react'
import _ from 'lodash'

import {
    mathType,
    mathOperatorType,
} from '../common/types'
import { DEFAULT_ASSIGN } from '../common/defaults'

import { VARTYPE_IS_NUM } from '../common/arrows';
import { usePath } from '../hooks/Hooks'

import PlaygroundDrop from './components/PlaygroundDrop';
import BasicOpDrag from './components/BasicOpDrag';
import ValueDrag from './components/ValueDrag';

export default function NumberView(props) {
    const varInfo = usePath(path)
    
    let [error, setError] = useState('')

    const { attach, attachVar, path, subfieldKey } = props
    const assign = _.cloneDeep(attach.assign || DEFAULT_ASSIGN)

    const workspace = attach
    const mainProps = {
        workspace,
        setWorkspace: props.setWorkspace,
    }

    const clearWorkspace = () => console.log('clear')
    const resetWorkspace = () => console.log('reset')

    const assignable = _.filter(attachVar, VARTYPE_IS_NUM)
    return (
        <div>
            <div className="row">
                <div className="dashboard-section-title">variable</div>
                <ValueDrag text={subfieldKey} mathType={mathType.variable}/>
            </div>
            <div className="-sep-no-m"></div>
            <PlaygroundDrop
                {...mainProps}
                assign={assign}
                setError={setError}
                subpath={['assign']}
                clearWorkspace={clearWorkspace}
                resetWorkspace={resetWorkspace}
            />
            <div className="-sep-no-m"></div>
            <div className="-y-p">
                <div className="dashboard-section-title">BASIC OPERATIONS</div>
                <div className="row -x-p">
                    {_.toArray(mathOperatorType).map(item => (
                        <BasicOpDrag
                            key={item.key}
                            item={item}
                        />
                    ))}
                </div>
            </div>
            <div className="-sep-no-m"></div>
            <div className="-y-p">
                <div className="dashboard-section-title">VARIABLES</div>
                <div className="row -x-p">
                    <ValueDrag text={0} mathType={mathType.number}/>
                    {assignable.map(item => (
                        <ValueDrag
                            key={item.key}
                            text={item.key}
                            mathType={mathType.variable}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}