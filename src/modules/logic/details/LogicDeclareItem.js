import React from 'react'

import { dropdownType } from '../../dropdown/types'
import { variableType } from '../types';

import LogicDeclareValue from './LogicDeclareValue'

import { DropClick } from '../../components/Common';

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
                <div style={{color:'#ddd', marginLeft: 6}}>{item.key}</div>
            </div>
            <DropClick
                className="logic-button"
                dropdown={dropdownType.declareVarType}
                params={{
                    currentValue: variableTypes,
                    path: [...path, item.key],
                }}
                style={{
                    color: '#ddd',
                    borderLeft: '4px solid #18449b',
                    marginRight: 6,
                }}
            >
                <div style={{color:'#999', marginRight: 6}}>type</div>
                {variableTypes.map(type => type && <i key={type} className={variableType[type].icon}/>)}
                {variableTypes.length === 0 && '...'}
            </DropClick>
            <LogicDeclareValue {...props} item={item}/>
        </div>
    )
}