import React from 'react'
import _ from 'lodash'

import { comparisonType } from '../../logic/types'

import DropTitle from '../components/DropTitle';
import DropItem from '../components/DropItem';

export default function PickComparison(props) {
    const { attach, subfieldKey } = props

    const handleSelect = (item) => {
        props.updatePage(item)
        props.showDropdown()
    }

    const renderItem = (item) => {
        const selectedKey = attach[subfieldKey] && attach[subfieldKey].key
        const chosen = typeof selectedKey === 'string' && selectedKey === item.key

        return (
            <DropItem
                key={item.key}
                chosen={chosen}
                onClick={() => handleSelect(item)}
                leftIcon={item.icon}
                rightIcon="mdi mdi-check"
            >
                {item.title}
            </DropItem>
        )
    }

    return (
        <>
            <DropTitle>pick comparison</DropTitle>
            {_.toArray(comparisonType).map(renderItem)}
        </>
    )
}