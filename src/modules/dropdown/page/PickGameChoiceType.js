import React from 'react'
import _ from 'lodash'

import { gameChoiceType } from '../../common/types';

import {
    DropItem,
    DropTitle,
} from '../components/Common'

export default function PickGameChoiceType({
    slate,
    update,
    showDropdown,
}) {
    const handleSelect = (item) => {
        update({
            gameChoice: item.key,
            value: "",
        })
        showDropdown();
    }

    const renderItem = (item) => {
        return (
            <DropItem
                key={item.key}
                chosen={item.key === slate.gameChoice}
                onClick={() => handleSelect(item)}
                leftIcon={item.icon}
                rightCheck
                text={item.title}
            />
        )
    }

    const items = _.toArray(gameChoiceType)
    return (
        <>
            <DropTitle>game choice types</DropTitle>
            {items.map(renderItem)}
        </>
    )
}