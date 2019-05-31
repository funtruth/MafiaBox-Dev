import React from 'react'
import _ from 'lodash'

import { logicType } from '../../common/types'
import { DEFAULT_LOGIC } from '../../common/defaults';

import {
    DropItem,
    DropParent,
    DropTitle,
} from '../components/Common'

export default function PickLogic({
    slate,
    update,
    showDropdown,
}){
    let handleSelect = (item) => {
        update({
            ...DEFAULT_LOGIC,
            key: slate.key,
            logicType: item.key,
        })
        showDropdown();
    }

    let renderItem = (item) => {
        const chosen = item.key === slate.logicType

        if (item.dropdown) {
            return (
                <DropParent
                    key={item.key}
                    chosen={chosen.toString()}
                    dropdown={item.dropdown}
                    showDropdown={showDropdown}
                    params={{
                        hoverKey: item.key,
                    }}
                    icon={item.icon}
                    text={item.key}
                />
            )
        }

        return (
            <DropItem
                key={item.key}
                chosen={chosen}
                onClick={() => handleSelect(item)}
                leftIcon={item.icon}
                rightCheck
                text={item.title}
            />
        )
    }

    const items = _.orderBy(logicType, i => i.index)
    return (
        <>
            <DropTitle>logic types</DropTitle>
            {items.map(renderItem)}
        </>
    )
}