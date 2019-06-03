import React from 'react'
import { useDispatch } from 'react-redux'

import {
    dropdownType,
    modalType,
    variableType,
} from '../../common/types';
import { parseNumber } from '../LogicEngine'

import { showModal } from '../../modal/ModalReducer'

import { DropClick, LogicButton } from '../../components/Common';

//TODO this is invalid
export default function LogicDeclareValue(props) {
    const dispatch = useDispatch();
    const { item, vars, path } = props
    console.log({item})

    if (item.static) return null;

    let newPath = [...path, item.key]

    const noTypeSelected = !item.variableTypes || !item.variableTypes.length
    if (noTypeSelected) return null;

    const isNumber = item.variableTypes.includes(variableType.number.key)
    const isUid = item.variableTypes.includes(variableType.uid.key)
    const isBoolean = item.variableTypes.includes(variableType.boolean.key)

    let handleNumber = () => {
        dispatch(showModal(modalType.assignNumber, {
            attachVar: vars,
            attach: item,
            path: newPath,
            subfieldKey: item.value,
        }))
    }

    if (isNumber) {
        return (
            <LogicButton
                highlight="blue"
                onClick={handleNumber}
                color="whitish"
            >
                <div style={{color:'#999', marginRight: 6}}>assign</div>
                {parseNumber(item.assign) || '...'}
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
                    highlight="blue"
                    color="whitish"
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
                    highlight="blue"
                    color="whitish"
                >
                    <div style={{color:'#999', marginRight: 6}}>assign</div>
                    {item.assign.value || '...'}
                </LogicButton>
            </DropClick>
        )
    }
    return null;
}