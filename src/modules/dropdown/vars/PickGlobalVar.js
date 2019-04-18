import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import {
    updateType,
    VAR_DEFAULTS,
} from '../../logic/types';

import {
    parseJS,
} from '../../logic/proptool';

import {
    DropItem,
    DropTitle,
} from '../components/Common';

export default connect(
    state => ({
        globalVars: state.page.globalVars,
    })
)(function PickGlobalVar(props) {
    const { globalVars } = props
    
    const handleSelect = (item, isWild) => {
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
            >
                {item.key}
            </DropItem>
        )
    }
    
    const items = _.filter(globalVars)
    return (
        <>
            <DropTitle>search for</DropTitle>
            <DropTitle>global vars</DropTitle>
            {items.map(renderItem)}
        </>
    )
})