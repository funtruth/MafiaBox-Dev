import React from 'react'
import './dropdown.css'
import { useSelector } from 'react-redux'

import Dropdown from './components/Dropdown';
import DropdownConnect from './DropdownConnect';

export default function DropdownView(props) {
    const dropdownKeys = useSelector(state => state.dropdown.dropdownKeys)

    if (dropdownKeys.length === 0) return null

    //covers the whole screen
    return (
        <div className="drop-down-pause">
            {dropdownKeys.map((item, index) => (
                <Dropdown
                    {...item}
                    key={item.key + index + JSON.stringify(item.serialList)}
                    index={index}
                >
                    <DropdownConnect
                        item={item}
                        index={index}
                    />
                </Dropdown>
            ))}
        </div>
    )
}