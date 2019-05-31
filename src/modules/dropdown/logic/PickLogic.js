import React from 'react'
import _ from 'lodash'

import { logicType, parseType } from '../../common/types'
import { DEFAULT_LOGIC } from '../../common/defaults';

import {
    DropItem,
    DropParent,
    DropTitle,
} from '../components/Common'
import { LOGIC_ITEM_DATA_SOURCE, LOGIC_ITEM_VAR, LOGIC_ITEM_VAR_LIBRARY } from '../../logic/defaults';

export default function PickLogic({
    slate,
    update,
    showDropdown,
}){
    const createDefault = (type) => {
        switch(type) {
            case logicType.variable.key:
            case logicType.update.key:
                return {
                    source: LOGIC_ITEM_DATA_SOURCE,
                    byId: {
                        [LOGIC_ITEM_DATA_SOURCE]: {
                            ...LOGIC_ITEM_VAR,
                            key: LOGIC_ITEM_DATA_SOURCE,
                            library: LOGIC_ITEM_VAR_LIBRARY,
                            parseBy: parseType.collection,
                        },
                    },
                }
            case logicType.event.key:
            case logicType.return.key:
            case logicType.function.key:
            default:
                console.warn('not supported yet.')
                return "";
        }
    }

    const handleSelect = (item) => {
        update({
            ...DEFAULT_LOGIC,
            key: slate.key,
            logicType: item.key,
            data: createDefault(),
        })
        showDropdown();
    }

    const renderItem = (item) => {
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