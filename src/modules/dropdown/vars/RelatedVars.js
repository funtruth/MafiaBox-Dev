import React from 'react'

import {
    updateType,
} from '../../common/types';
import {
    VAR_DEFAULTS,
} from '../../common/defaults'

import {
    parseJS,
} from '../../logic/proptool';
import {
    useVarType,
} from '../../hooks/Hooks'

import {
    DropItem,
    DropTitle,
} from '../components/Common';

/* @params
    input => variableType, vars
    ouput => matching vars
*/
export default function RelatedVars(props) {
    const { variableType, attachVar, onClick } = props

    const [tameVars, wildVars] = useVarType(variableType, attachVar)

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

    return (
        <>
            <DropTitle>vars with same type</DropTitle>
            {tameVars.map(renderItem(false))}
            <DropTitle>incomplete vars</DropTitle>
            {wildVars.map(renderItem(true))}
        </>
    )
}