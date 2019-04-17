import React from 'react'
import { connect } from 'react-redux'

import { modalType } from '../../modal/types';
import { orderOfOp } from '../../modal/vars/components/types'
import { variableType } from '../types';
import { dropdownType } from '../../dropdown/types'

import { showModal } from '../../modal/ModalReducer'

import { DropClick, LogicButton } from '../../components/Common';


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
            <LogicButton
                highlight="#18449b"
                onClick={handleNumber}
                style={{
                    color: '#ddd',
                    borderLeft: '4px solid ',
                }}
            >
                <div style={{color:'#999', marginRight: 6}}>assign</div>
                {orderOfOp(item.assign) || '...'}
            </LogicButton>
        )
    } else if (isUid) {
        return (
            <DropClick
                dropdown={dropdownType.pickUidAssign}
                params={{
                    attachVar: vars,
                    item,
                    path,
                    subpath: [item.value, 'assign'],
                }}
            >
                <LogicButton
                    highlight="#18449b"
                    style={{
                        color: '#ddd',
                    }}
                >
                    <div style={{color:'#999', marginRight: 6}}>assign</div>
                    {item.assign.value || '...'}
                </LogicButton>
            </DropClick>
        )
    } else if (isBoolean) {
        return (
            <DropClick
                dropdown={dropdownType.pickBooleanAssign}
                params={{
                    item,
                    path,
                    subpath: [item.value, 'assign'],
                }}
            >
                <LogicButton
                    highlight="#18449b"
                    style={{
                        color: '#ddd',
                    }}
                >
                    <div style={{color:'#999', marginRight: 6}}>assign</div>
                    {item.assign.value || '...'}
                </LogicButton>
            </DropClick>
        )
    } else if (isString) {
        return (
            <LogicButton
                highlight="#18449b"
                onClick={handleString}
                style={{
                    color: '#ddd',
                }}
            >
                <div style={{color:'#999', marginRight: 6}}>assign</div>
                ...
            </LogicButton>
        )
    } else {
        console.warn('illegal declare type. LogicDeclareValue')
        return null;
    }
})