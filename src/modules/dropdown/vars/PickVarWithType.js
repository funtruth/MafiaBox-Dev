import React from 'react'

import { parseType, variableType } from '../../common/types'
import { parseJS } from '../../logic/proptool';

import {
    useVarType,
} from '../../hooks/Hooks'

import {
    DropEmpty,
    DropItem,
    DropTitle,
} from '../components/Common'
import Types from '../types/index';

export default function PickVarWithType(props){
    const {
        slate,
        baseVar,
        scopedVars,//passed
        pickVarClick,//passed
    } = props

    //must have a reference variable
    if (!baseVar || !baseVar.variableTypes) {
        return (
            <>
                <DropTitle>error</DropTitle>
                <DropEmpty text="select a variable first ..."/>
            </>
        )
    }

    const onClear = () => {
        pickVarClick({
            value: '""',
            display: '""',
            variableTypes: "",
            parseBy: parseType.constant,
        })
    }

    const handleSelect = (item) => {
        pickVarClick({
            value: item.value,
            display: parseJS(item.value),
            variableTypes: item.variableTypes,
        })
    }

    const renderItem = (item) => {
        //don't show same variable
        if (item.value === baseVar.value) return null

        const chosen = slate.value === item.value

        return (
            <DropItem
                key={item.key}
                chosen={chosen}
                onClick={() => handleSelect(item)}
                rightCheck
                text={item.display}
            />
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
            case variableType.function.key:
                return <Types.PickTypeFunction key={type} {...props}/>
            case variableType.string.key:
            case variableType.object.key:
            case variableType.uidObject.key:
            default:
                return null;
        }
    }
    
    const { variableTypes } = baseVar
    const [tameVars, wildVars] = useVarType(variableTypes, scopedVars)
    
    return (
        <>
            <DropTitle>vars with same type</DropTitle>
            {tameVars.map(renderItem)}
            <DropEmpty list={tameVars} text="no variables found"></DropEmpty>
            <DropTitle>incomplete vars</DropTitle>
            {wildVars.map(renderItem)}
            <DropItem
                leftIcon="eraser-variant"
                text="empty"
                onClick={onClear}
            />
            <DropEmpty list={wildVars} text="no variables found"></DropEmpty>
            {variableTypes.map(renderType)}
        </>
    )
}