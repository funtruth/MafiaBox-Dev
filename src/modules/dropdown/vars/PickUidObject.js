import React from 'react'
import { connect } from 'react-redux'
import * as helpers from '../../common/helpers'
import _ from 'lodash'

import { VAR_DEFAULTS } from '../types'
import { variableType, panelType } from '../../logic/types'

import {
    DropEmpty,
    DropItem,
    DropScroll,
    DropTitle,
} from '../components/Common'

/*accessed from
    LogicBlock -> logicType: 'operator', operatorType: 'forin' -> LogicPanel onClick
*/
function PickUidObject(props) {
    const { attach, subfieldKey, attachVar, updateRef } = props
    const selectedValue = attach[subfieldKey] || {}

    let uidObjects = _(attachVar)
        .filter(i => i.variableTypes && i.variableTypes.includes(variableType.uidObject.key))
        .value()

    const rssUidObjects = _(updateRef)
        .filter(i => i.variableTypes && i.variableTypes.includes(variableType.rss.key) &&
            i.variableTypes.includes(variableType.uidObject.key))
        .value()
        
    let handleSelect = (item) => {
        props.updatePage({
            ...VAR_DEFAULTS,
            panelType: panelType.var.key,
            value: item.key,
            declare: {
                key: helpers.genUID('@uid', attachVar, 'x'),
                variableTypes: [
                    variableType.uid.key,
                    variableType.string.key,
                ],
            },
        })
        props.showDropdown()
    }

    const renderItem = (item) => {
        const chosen = selectedValue.value === item.key

        return (
            <DropItem
                key={item.key}
                chosen={chosen}
                onClick={() => handleSelect(item)}
                rightIcon="mdi mdi-check"
            >{item.key}</DropItem>
        )
    }

    return (
        <>
            <DropTitle>UID Objects</DropTitle>
            <DropScroll>
                {uidObjects.map(renderItem)}
                <DropEmpty>no results found</DropEmpty>
            </DropScroll>
            <DropTitle>game values</DropTitle>
            <DropScroll>
                {rssUidObjects.map(renderItem)}
            </DropScroll>
        </>
    )
}

export default connect(
    state => ({
        updateRef: state.template.updateRef,
    })
)(PickUidObject)