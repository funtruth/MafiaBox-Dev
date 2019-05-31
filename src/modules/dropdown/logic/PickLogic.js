import React from 'react'
import _ from 'lodash'

import { logicType } from '../../common/types'
import { DEFAULT_LOGIC } from '../../common/defaults';
import { palette } from '../../components/Standards';

import {
    DropItem,
    DropParent,
    DropTitle,
} from '../components/Common'

export default function PickLogic(props) {
    const { logicItem } = props

    //PickLogic does not support childKeys
    let handleSelect = (item) => {
        props.updatePage({
            ...DEFAULT_LOGIC,
            key: logicItem.key,
            logicType: item.key,
        })
        props.showDropdown()
    }

    let renderItem = (item) => {
        const chosen = item.key === logicItem.logicType

        if (item.dropdown) {
            return (
                <DropParent
                    key={item.key}
                    chosen={chosen.toString()}
                    dropdown={item.dropdown}
                    showDropdown={props.showDropdown}
                    params={{
                        hoverKey: item.key,
                    }}
                    icon={item.icon}
                    text={item.key}
                    style={{
                        backgroundColor: chosen && palette(item.color),
                    }}
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
                style={{
                    backgroundColor: chosen && palette(item.color),
                }}
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