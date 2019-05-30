import React from 'react'

import {
    updateType,
    modalType,
} from '../../common/types';
import {
    VAR_DEFAULTS,
} from '../../common/defaults'

import {
    parseJS,
} from '../../logic/proptool';
import {
    VARTYPE_IS_NUM,
    VARTYPE_IS_STR,
} from '../../common/arrows';
import {
    useVarType,
} from '../../hooks/Hooks'

import {
    DropItem,
    DropTitle,
} from '../components/Common';

/* @params
    input => variableTypes, vars
    ouput => matching vars
    
    LOCATIONS:
    PickNumUpdate
    PickVarWithType
    ReplaceWildcard
*/
export default function RelatedVars(props) {
    const { variableTypes, attachVar, path, onClick } = props

    const [tameVars, wildVars] = useVarType(variableTypes, attachVar)

    const handleSelect = (item, isWild) => {
        if (onClick) {
            onClick(item, isWild)
            return;
        }

        props.updatePage({
            ...VAR_DEFAULTS,
            value: item.key,
            wildcardValue: isWild ? item.key : '',
            display: parseJS(item.key),
            updateType: updateType.variable,
            variableTypes: item.variableTypes,
        })
        props.showDropdown();
    }

    const renderItem = (isWild) => (item) => {
        return (
            <DropItem
                key={item.key}
                onClick={() => handleSelect(item, isWild)}
                text={item.key}
            />
        )
    }

    //Advanced options
    const handleCalculator = () => {
        props.showModal(modalType.editNumber, {
            path: [...path, 'assign'],
            //editNumber correlated to NumberView right now which is incorrect
        })
        props.showDropdown();
    }

    const renderNumber = () => {
        if (!VARTYPE_IS_NUM(props)) return null;
        return (
            <DropItem
                onClick={handleCalculator}
                leftIcon="mdi mdi-calculator"
                text="equation ..."
            />
        )
    }
    
    const handleString = () => {
        props.showModal(modalType.editNumber, {
        })
        props.showDropdown();
    }

    const renderString = () => {
        if (!VARTYPE_IS_STR(props)) return null;
        return (
            <DropItem
                onClick={handleString}
                leftIcon="mdi mdi-pencil"
                text="equation ..."
            />
        )
    }

    return (
        <>
            <DropTitle>vars with same type</DropTitle>
            {tameVars.map(renderItem(false))}
            <DropTitle>incomplete vars</DropTitle>
            {wildVars.map(renderItem(true))}
            <DropTitle>other</DropTitle>
            {renderNumber()}
            {renderString()}
        </>
    )
}