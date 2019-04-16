import React from 'react'
import { connect } from 'react-redux'

import { modalType } from '../../modal/types';
import { orderOfOp } from '../../modal/vars/components/types'
import { variableType } from '../types';
import { dropdownType } from '../../dropdown/types'

import { showModal } from '../../modal/ModalReducer'


export default connect(
    null,
    {
        showModal,
    }
)(function LogicDeclareValue(props) {
    const { item, vars, path } = props

    if (item.static) return null;

    let newPath = [...path, item.key]

    const noTypeSelected = !item.variableTypes || !item.variableTypes.length
    if (noTypeSelected) return null;

    const isNumber = item.variableTypes.includes(variableType.number.key)
    const isUid = item.variableTypes.includes(variableType.uid.key)
    const isBoolean = item.variableTypes.includes(variableType.boolean.key)
    const isString = item.variableTypes.includes(variableType.string.key)

    let handleNumber = () => {
        props.showModal(modalType.assignNum, {
            attachVar: vars,
            attach: item,
            path: newPath,
            subfieldKey: item.value,
        })
    }

    let handleString = () => {
        props.showModal(modalType.editString, {
            attachVar: vars,
            attach: item,
            path: newPath,
        })
    }
    
    if (isNumber) {
        return (
            <div
                className="logic-button row"
                highlight="true"
                onClick={handleNumber}
                style={{
                    color: '#ddd',
                    borderLeft: '4px solid #18449b',
                }}
            >
                <div style={{color:'#999', marginRight: 6}}>assign</div>
                {orderOfOp(item.assign) || '...'}
            </div>
        )
    } else if (isUid) {
        return (
            <div
                className="logic-button row app-onclick"
                menu-type={dropdownType.pickUidAssign}
                app-onclick-props={JSON.stringify({
                    attachVar: vars,
                    item,
                    path,
                    subpath: [item.value, 'assign'],
                })}
                style={{
                    color: '#ddd',
                    borderLeft: '4px solid #18449b',
                }}
            >
                <div style={{color:'#999', marginRight: 6}}>assign</div>
                {item.assign.value || '...'}
            </div>
        )
    } else if (isBoolean) {
        return (
            <div
                className="logic-button row app-onclick"
                menu-type={dropdownType.pickBooleanAssign}
                app-onclick-props={JSON.stringify({
                    item,
                    path,
                    subpath: [item.value, 'assign'],
                })}
                style={{
                    color: '#ddd',
                    borderLeft: '4px solid #18449b',
                }}
            >
                <div style={{color:'#999', marginRight: 6}}>assign</div>
                {item.assign.value || '...'}
            </div>
        )
    } else if (isString) {
        return (
            <div
                className="logic-button row"
                highlight="true"
                onClick={handleString}
                style={{
                    color: '#ddd',
                    borderLeft: '4px solid #18449b',
                }}
            >
                <div style={{color:'#999', marginRight: 6}}>assign</div>
                ...
            </div>
        )
    } else {
        console.warn('illegal declare type. LogicDeclareValue')
        return null;
    }
})