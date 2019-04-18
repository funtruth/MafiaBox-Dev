import React from 'react'
import _ from 'lodash'

import {
    updateType,
    VAR_DEFAULTS,
} from '../../logic/types'

import {
    getUpdateConfig,
    concatField,
} from '../../logic/proptool'
import {
    VARTYPE_IS_UID,
} from '../../common/arrows'

import {
    DropEmpty,
    DropParent,
    DropTitle,
} from '../components/Common'

export default function PickUid(props) {
    const { attach, attachVar, subfieldKey } = props
    
    const currentValue = attach[subfieldKey] || {}
    const currentKey = currentValue.value

    const handleSelect = (item) => {
        props.updatePage({
            ...VAR_DEFAULTS,
            value: item.key,
            updateType: updateType.uid,
        })
        props.showDropdown()
    }

    const renderItem = (item) => {
        const newKey = concatField(subfieldKey, item.key)
        const chosen = currentKey === item.key
        
        const config = getUpdateConfig(newKey)

        if (!config) {
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
            <DropParent
                {...props}
                key={item.key}
                dropdownType={config.dropdown}
                params={{
                    subfieldKey: newKey,
                    subpath: [newKey],
                }}
                text={item.key}
            />
        )
        
    }

    const uids = _.filter(attachVar, VARTYPE_IS_UID)
    return (
        <>
            <DropTitle>uids</DropTitle>
            {uids.map(renderItem)}
            <DropEmpty list={uids} text="no UIDS found"/>
        </>
    )
}