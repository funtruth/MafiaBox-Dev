import React from 'react'

import { getSubfields } from '../../logic/proptool';

import { DropItem, DropTitle } from '../components/Common';

export default function GameChoiceOrdered({
    slate,
    update,
    showDropdown,
}){
    //return the number of ordered players
    const handleSelect = (index) => {
        update(index + 1)
        showDropdown();
    }

    const renderItem = (item, index) => {
        const chosen = slate.value === item.value

        return (
            <DropItem
                key={item.key}
                chosen={chosen}
                text={item.value}
                onClick={() => handleSelect(index)}
            />
        )
    }

    const items = getSubfields('(rss)(choices)(@)(ordered)')
    return (
        <>
            <DropTitle>choices</DropTitle>
            {items.map(renderItem)}
        </>
    )
}