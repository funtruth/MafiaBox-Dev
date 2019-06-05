import React from 'react'

import { DropItem, DropTitle } from '../components/Common'

export default function PickTypeNumber({
    showDropdown,
}){
    const handleSelect = () => {
        showDropdown();
    }

    return (
        <>
            <DropTitle>advanced</DropTitle>
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