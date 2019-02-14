import React, { useState } from 'react'
import _ from 'lodash'

import { VAR_DEFAULTS } from '../types'
import { variableType, panelType } from '../../logic/types'

import DropTitle from '../components/DropTitle';

export default function PickUidObject(props) {
    const { attach, subfieldKey, attachVar } = props
    let [vars] = useState(attachVar)
    let selectedValue = attach[subfieldKey] || {}

    let uidObjects = _(vars)
        .toArray()
        .filter(i => i.variableTypes.includes(variableType.uidObject.key))
        .value()

    let handleSelect = (item) => {
        props.updatePage({
            ...VAR_DEFAULTS,
            panelType: panelType.var.key,
            value: item.key,
        })
        props.showDropdown()
    }

    return (
        <>
            <DropTitle>UID Objects</DropTitle>
            {uidObjects.length > 0 ?
                <div className="drop-down-scrollable">
                    {uidObjects.map(item => {
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
                    })}
                </div>
                :<div className="drop-down-empty">no results found</div>
            }
        </>
    )
}