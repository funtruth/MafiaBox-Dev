import React from 'react'
import { connect } from 'react-redux'
import * as helpers from '../../common/helpers'
import _ from 'lodash'

import { VAR_DEFAULTS } from '../types'
import { variableType, panelType } from '../../logic/types'

import DropTitle from '../components/DropTitle';
import DropEmpty from '../components/DropEmpty';

function PickUidObject(props) {
    const { attach, subfieldKey, attachVar, updateRef } = props
    let selectedValue = attach[subfieldKey] || {}

    let uidObjects = _(attachVar)
        .toArray()
        .filter(i => i.variableTypes.includes(variableType.uidObject.key))
        .value()

    const rssUidObjects = _.filter(updateRef,
        i => i.variableTypes.includes(variableType.rss.key) &&
            i.variableTypes.includes(variableType.uidObject.key)
    )

    let handleSelect = (item) => {
        const rssVar = item.variableTypes.includes(variableType.rss.key)//TODO hacky

        props.updatePage({
            ...VAR_DEFAULTS,
            panelType: panelType.var.key,
            value: rssVar ? `rss.${item.key}` : item.key,
            declare: {
                key: helpers.genUID('$uid', attachVar, '_x'),
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
            <div
                key={item.key}
                className="drop-down-menu-option"
                chosen={chosen.toString()}
                onClick={() => handleSelect(item)}
            >
                {item.key}
                <i className="mdi mdi-check"/>
            </div>
        )
    }

    return (
        <>
            <DropTitle>UID Objects</DropTitle>
            <div className="drop-down-scrollable">
                {uidObjects.map(renderItem)}
                <DropEmpty>no results found</DropEmpty>
            </div>
            <DropTitle>game values</DropTitle>
            <div className="drop-down-scrollable">
                {rssUidObjects.map(renderItem)}
            </div>
        </>
    )
}

export default connect(
    state => ({
        updateRef: state.template.updateRef,
    })
)(PickUidObject)