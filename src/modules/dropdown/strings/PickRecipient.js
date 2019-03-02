import React from 'react'
import _ from 'lodash'

import { variableType } from '../../logic/types'
import DropTitle from '../components/DropTitle';
import DropEmpty from '../components/DropEmpty';

export default function PickRecipient(props) {
    const { selectionType, state, attachVar, selectedKey } = props

    let pickUid = (item, info) => {
        const otherType = selectionType === 'showTo' ? 'hideFrom' : 'showTo'

        props.updatePage({
            [selectionType]: {
                ...info,
                [item.key]: !info[item.key],
            },
            [otherType]: {},
        })
        props.showDropdown()
    }

    let pickEveryone = () => {
        props.updatePage({
            showTo: {},
            hideFrom: {},
        })
        props.showDropdown()
    }

    const uids = _.filter(attachVar, i => i.variableTypes && i.variableTypes.includes(variableType.uid.key))

    const inclusive = selectionType === 'showTo'
    
    const selectedItem = (state.value && state.value[selectedKey]) || {}
    const info = selectedItem[selectionType] || {}
    const everyone = Object.keys(selectedItem.showTo || {}).length === 0
    
    return (
        <div>
            <DropTitle>uids</DropTitle>
            {<div>
                {uids.map(item => {
                    const chosen = info[item.key] || false

                    return(
                        <div
                            key={item.key}
                            className="drop-down-menu-option"
                            chosen={chosen.toString()}
                            onClick={() => pickUid(item, info)}
                        >
                            {item.key}
                            <i className="mdi mdi-check"/>
                        </div>
                    )
                })}
                <DropEmpty>no UIDS found</DropEmpty>
            </div>}
            {inclusive && <div>
                <div className="-sep"/>
                <div
                    className="drop-down-menu-option"
                    chosen={everyone.toString()}
                    onClick={pickEveryone}
                >
                    <i className="mdi mdi-earth drop-down-menu-icon"/>
                    everyone
                    <i className="mdi mdi-check"/>
                </div>
            </div>}
        </div>
    )
}