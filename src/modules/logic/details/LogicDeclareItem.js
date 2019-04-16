import React from 'react'

import { dropdownType } from '../../dropdown/types'
import { variableType } from '../types';

import LogicDeclareValue from './LogicDeclareValue'

export default function LogicDeclareItem(props) {
    const { item, path } = props
    const variableTypes = item.variableTypes || []
    
    return (
        <div className="row-nowrap" style={{ marginTop: 2 }}>
            <div
                className="row logic-button"
                style={{
                    color: '#999',
                    borderLeft: '4px solid #18449b',
                    marginRight: 6,
                }}
            >
                variable
                <div style={{color:'#ddd', marginLeft: 6}}>{item.display}</div>
            </div>
            <div
                className="logic-button app-onclick"
                menu-type={dropdownType.declareVarType}
                app-onclick-props={JSON.stringify({
                    currentValue: variableTypes,
                    path: [...path, item.value],
                })}
                style={{
                    color: '#ddd',
                    borderLeft: '4px solid #18449b',
                }}
            >
                <div style={{color:'#999', marginRight: 6}}>types</div>
                {variableTypes.map(type => <i key={type} className={`${variableType[type].icon} letter-s`}/>)}
                {variableTypes.length === 0 && '...'}
            </div>
            {false && <LogicDeclareValue {...props} item={item}/>}
        </div>
    )
}