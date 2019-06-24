import React from 'react'

import { DropItem, DropTitle } from '../components/Common'

export default function PickTypeUIDArr({
    showDropdown,
}){
    const handleSelect = () => {
        showDropdown();
    }

    return (
        <>
            <DropTitle>options</DropTitle>
            <DropItem
                onClick={handleSelect}
                leftIcon="step-backward"
                text="previous player ..."
            />
            <DropItem
                onClick={handleSelect}
                leftIcon="step-forward"
                text="next player ..."
            />
            <DropItem
                onClick={handleSelect}
                leftIcon="dice-3"
                text="random player ..."
            />
        </>
    )
}