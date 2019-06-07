import React from 'react'
import _ from 'lodash'

import { comparisonType } from '../../logic/types'

import { VARTYPE_FILTER } from '../../common/arrows';

import { 
    DropEmpty,
    DropItem,
    DropTitle,
} from '../components/Common';

export default function PickComparison({
    slate,
    path,
    baseVar,
    updateGeneral,
    showDropdown,
}){
    const handleSelect = (item) => {
        updateGeneral({
            path,
            update: {
                display: item.code,
            },
        }, {
            path: [...path, 'value'],
            update: {
                operator: item.key,
            }
        })
        showDropdown();
    }

    const handleExists = () => {
        updateGeneral({
            path,
            update: {
                display: comparisonType.exists.title,
            }
        }, {
            path: [...path, 'value'],
            update: {
                operator: comparisonType.exists.key,
                right: '',
            }
        })
        showDropdown();
    }

    const renderItem = (item) => {
        const chosen = slate.value && (slate.value.operator === item.key)

        return (
            <DropItem
                key={item.key}
                chosen={chosen}
                onClick={() => handleSelect(item)}
                leftIcon={item.icon}
                rightCheck
                text={item.title}
            />
        )
    }

    //user must set 'baseVar' before continuing to ensure comparison is appropriate
    if (!baseVar || !baseVar.variableTypes) {
        return (
            <>
                <DropTitle>error</DropTitle>
                <DropEmpty text="select a variable first ..."/>
            </>
        )
    }

    //hide comparisonType if it has variableTypes & they don't match baseVar
    const items = _.filter(comparisonType,
        i => i.showInPickComparison && (!i.variableTypes || VARTYPE_FILTER(i.variableTypes)(baseVar)))

    return (
        <>
            <DropTitle>pick comparison</DropTitle>
            {items.map(renderItem)}
            <DropTitle>others</DropTitle>
            <DropItem
                leftIcon="lifebuoy"
                text="exists"
                onClick={handleExists}
            />
        </>
    )
}