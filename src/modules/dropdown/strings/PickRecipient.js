import React from 'react'
import _ from 'lodash'

import { variableType } from '../../logic/types'
import DropTitle from '../components/DropTitle';
import DropEmpty from '../components/DropEmpty';

export default function PickRecipient(props) {
    const { selectionType, attach, attachVar, eventIndex } = props
    let wsClone = _.cloneDeep(attach)

    let pickUid = (item, info) => {
        const otherType = selectionType === 'showTo' ? 'hideFrom' : 'showTo'
        Object.assign(wsClone.eventArr[eventIndex], {
            [selectionType]: {
                ...info,
                [item.key]: !info[item.key],
            },
            [otherType]: {},
        })
        props.updatePage(wsClone)
        props.showDropdown()
    }

    let pickEveryone = () => {
        Object.assign(wsClone.eventArr[eventIndex], {
            showTo: {},
            hideFrom: {},
        })
        props.updatePage(wsClone)
        props.showDropdown()
    }

    const uids = _.filter(attachVar, i => i.variableTypes && i.variableTypes.includes(variableType.uid.key))

    const inclusive = selectionType === 'showTo'
    
    const selectedItem = (wsClone.eventArr && wsClone.eventArr[eventIndex]) || {}
    const info = selectedItem[selectionType] || {}
    const everyone = Object.keys(selectedItem.showTo || {}).length === 0
    
    return (
        <div>
            <DropTitle>uids</DropTitle>
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
            <DropEmpty list={uids} text="no UIDS found"/>
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