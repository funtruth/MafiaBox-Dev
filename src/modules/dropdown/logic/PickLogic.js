import React from 'react'
import _ from 'lodash'

import {
    logicType,
    DEFAULT_LOGIC,
} from '../../logic/types'

import {
    DropItem,
    DropParent,
    DropTitle,
} from '../components/Common'

export default function PickLogic(props) {
    const { attach } = props

    //Normal logic cannot have Internal Logic apart from Operator Logic
    let handleSelect = (item) => {
        props.updatePage({
            ...DEFAULT_LOGIC,
            down: attach.down,
            logicType: item.key,
        })
        props.showDropdown()
    }

    let renderItem = (item) => {
        const chosen = item.key === attach.logicType

        if (item.dropdown) {
            return (
                <DropParent
                    {...props}
                    key={item.key}
                    chosen={chosen.toString()}
                    dropdownType={item.dropdown}
                    params={{
                        hoverKey: item.key,
                    }}
                    icon={item.icon}
                    text={item.key}
                    style={{
                        backgroundColor: chosen && item.color,
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
                rightIcon="mdi mdi-check"
                style={{
                    backgroundColor: chosen && item.color,
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