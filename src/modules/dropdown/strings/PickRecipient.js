import React from 'react'
import _ from 'lodash'

import { VARTYPE_IS_UID } from '../../common/arrows';

import { DropEmpty, DropItem, DropTitle } from '../components/Common';

export default function PickRecipient({
    attachVar,
    slate,
    selectionType,
    update,
    showDropdown,
}){
    const pickUid = (item, info) => {
        const otherType = selectionType === 'showTo' ? 'hideFrom' : 'showTo'
        update({
            [selectionType]: {
                ...info,
                [item.key]: !info[item.key],
            },
            [otherType]: {},
        })
        showDropdown()
    }

    const pickEveryone = () => {
        update({
            showTo: {},
            hideFrom: {},
        })
        showDropdown()
    }

    const uids = _.filter(attachVar, VARTYPE_IS_UID)
    const info = slate[selectionType] || {}
    
    return (
        <>
            <DropTitle>uids</DropTitle>
            {uids.map(item => (
                <DropItem
                    key={item.key}
                    chosen={info[item.key]}
                    onClick={() => pickUid(item, info)}
                    text={item.key}
                    rightCheck
                />
            ))}
            <DropEmpty list={uids} text="no UIDS found"/>
            {selectionType === 'showTo' &&
                <div>
                    <DropTitle>other</DropTitle>
                    <DropItem
                        chosen={_.filter(info).length === 0}
                        onClick={pickEveryone}
                        leftIcon="mdi mdi-earth"
                        text="everyone"
                        rightCheck
                    />
                </div>
            }
        </>
    )
}