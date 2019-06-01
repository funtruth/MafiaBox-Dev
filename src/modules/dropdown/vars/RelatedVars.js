import React from 'react'

import {
    modalType,
    parseType,
} from '../../common/types';
import {
    LOGIC_ITEM_VAR,
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
    const { variableTypes, scopedVars, path, onClick } = props

    const [tameVars, wildVars] = useVarType(variableTypes, scopedVars)

    const handleSelect = (item) => {
        if (onClick) {
            onClick(item)
            return;
        }

        props.updatePage({
            ...LOGIC_ITEM_VAR,
            display: parseJS(item.key),
            nativeValue: item.key,
            value: item.key,
            parseBy: parseType.variable,
            variableTypes: item.variableTypes,
        })
        props.showDropdown();
    }

    const renderItem = (item) => {
        return (
            <DropItem
                key={item.key}
                onClick={() => handleSelect(item)}
                text={item.key}
            />
        )
    }

    //Advanced options
    const handleCalculator = () => {
        props.showModal(modalType.editNumber, {
            path,
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
            path,
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
            {tameVars.map(renderItem)}
            <DropTitle>incomplete vars</DropTitle>
            {wildVars.map(renderItem)}
            <DropTitle>other</DropTitle>
            {renderNumber()}
            {renderString()}
        </>
    )
}