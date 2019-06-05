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
                leftIcon="mdi mdi-step-backward"
                text="previous player ..."
            />
            <DropItem
                onClick={handleSelect}
                leftIcon="mdi mdi-step-forward"
                text="next player ..."
            />
            <DropItem
                onClick={handleSelect}
                leftIcon="mdi mdi-dice-3"
                text="random player ..."
            />
        </>
    )
}