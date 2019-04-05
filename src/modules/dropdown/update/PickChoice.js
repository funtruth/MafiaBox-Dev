import React from 'react'
import _ from 'lodash'

import {
    updateViewType,
    VAR_DEFAULTS,
} from '../../logic/types'

import {
    VARTYPE_IS_UID,
} from '../../common/arrows';

import {
    DropEmpty,
    DropTitle,
} from '../components/Common'

export default function PickChoice(props) {
    const { attachVar, attach, subfieldKey } = props

    const handleSelect = (item) => {
        props.updatePage({
            ...VAR_DEFAULTS,
            update: props.update,
            mutate: props.mutate,
            value: item.key || "$\"\"", //HACK
            updateViewType: updateViewType.uid,
        })
        props.showDropdown()
    }

    const renderItem = (item) => {
        const selectedKey = attach[subfieldKey] && attach[subfieldKey].value
        const chosen = typeof selectedKey === 'string' && selectedKey === item.key

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

    const selectedKey = attach[subfieldKey] && attach[subfieldKey].value
    const chosen = typeof selectedKey === 'string' && selectedKey === "$\"\""

    const uids = _.filter(attachVar, VARTYPE_IS_UID)
    
    return (
        <>
            <DropTitle>uids</DropTitle>
            <div>
                {uids.map(renderItem)}
                <DropEmpty>no UIDS found</DropEmpty>
            </div>
            <DropTitle>options</DropTitle>
            <div
                className="drop-down-menu-option"
                chosen={chosen.toString()}
                onClick={handleSelect}
            >
                <i className="drop-down-menu-icon mdi mdi-message-bulleted-off"/>
                no choice
                <i className="mdi mdi-check"/>
            </div>
        </>
    )
}