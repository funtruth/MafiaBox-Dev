import React from 'react'
import _ from 'lodash'

import { comparisonType } from '../../logic/types'

import DropTitle from '../components/DropTitle';
import DropItem from '../components/DropItem';

export default function PickComparison(props) {
    const { attach, subfieldKey } = props
    const currentValue = attach[subfieldKey] || {}

    const handleSelect = (item) => {
        props.updatePage({
            ...item,
            display: item.title,
        })
        props.showDropdown()
    }

    const renderItem = (item) => {
        const chosen = currentValue.key === item.key

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

    return (
        <>
            <DropTitle>pick comparison</DropTitle>
            {_.toArray(comparisonType).map(renderItem)}
        </>
    )
}