import React from 'react'
import _ from 'lodash'

import {
    rssMap,
    updateType,
    VAR_DEFAULTS,
} from '../../logic/types';

import {
    parseJS,
    WILD_CHAR,
} from '../../logic/proptool';
import {
    VARTYPE_FILTER,
} from '../../common/arrows'

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

    const renderItem = (item) => {
        return (
            <DropItem
                key={item.key}
                onClick={() => handleSelect(item, false)}
                text={item.key}
            />
        )
    }

    const renderWild = (item) => {
        return (
            <DropItem
                key={item.key}
                onClick={() => handleSelect(item, true)}
                text={item.key}
            />
        )
    }

    const typeFilter = VARTYPE_FILTER(variableType)
    
    const relatedVars = _.filter(attachVar, typeFilter)
    const groupedRSSVars = _(rssMap).filter(typeFilter).groupBy(i => i.fields.includes(WILD_CHAR)).value()
    
    return (
        <>
            <DropTitle>vars with same type</DropTitle>
            {relatedVars.map(renderItem)}
            {groupedRSSVars.false && groupedRSSVars.false.map(renderItem)}
            <DropTitle>incomplete vars</DropTitle>
            {groupedRSSVars.true && groupedRSSVars.true.map(renderWild)}
        </>
    )
}