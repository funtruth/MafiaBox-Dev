import React from 'react'

import { variableType } from '../../common/types'

import {
    DropEmpty,
    DropTitle,
} from '../components/Common'
import Types from '../types/index';

export default function PickConstWithType(props){
    const { baseVar } = props

    //must have a reference variable
    if (!baseVar || !baseVar.variableTypes) {
        return (
            <>
                <DropTitle>error</DropTitle>
                <DropEmpty text="an error occurred ..."/>
            </>
        )
    }
    
    const renderType = (type) => {
        switch(type) {
            case variableType.number.key:
                return <Types.PickTypeNumber key={type} {...props}/>
            case variableType.boolean.key:
                return <Types.PickTypeBool key={type} {...props}/>
            case variableType.time.key:
                return <Types.PickTypeTime key={type} {...props}/>
            case variableType.uid.key:
                return <Types.PickTypeUID key={type} {...props}/>
            case variableType.global.key:
                return <Types.PickTypeGlobal key={type} {...props}/>
            case variableType.key.key:
                return <Types.PickTypeKey key={type} {...props}/>
            case variableType.string.key:
                console.warn('this should never happen.')
                return null;
            case variableType.object.key:
            case variableType.uidObject.key:
            case variableType.function.key:
            default:
                return null;
        }
    }
    
    return baseVar.variableTypes.map(renderType)
}