import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import generatePushID from '../../common/generatePushID'

export default function DropParent({
    chosen,
    dropdown,
    icon,
    params,
    style,
    text,
    showDropdown, //special indexed version
}){
    const dropdownKeys = useSelector(state => state.dropdown.dropdownKeys);
    
    //generate a unique serial number
    const [serialNo] = useState(generatePushID())

    //check if current DropParent serialNo is located in top dropdown serialList
    const indexedAt = ((dropdownKeys[dropdownKeys.length - 1]||[]).serialList||[]).indexOf(serialNo)

    //if current DropParent is in top serialList, highlight
    const isOrigin = indexedAt !== -1

    //push serial number inside list
    const onMouseOver = e => {
        //if current DropParent is the origin, don't re-render the Dropdown
        if (!dropdown || isOrigin) return;

        if (!showDropdown) return console.warn('pass showDropdown to DropParent');

        showDropdown(dropdown, e, {
            ...params,
            serialParent: serialNo,
        })
    }

    const handleClick = (e) => e.stopPropagation();
    
    return (
        <div
            className="drop-down-menu-option"
            chosen={chosen ? chosen.toString() : undefined}
            origin={isOrigin.toString()}
            onClick={handleClick}
            onMouseOver={onMouseOver}
            style={style}
        >
            {icon && <i className={`drop-down-menu-icon ${icon}`} style={{marginRight: 5}}></i>}
            {text}
            <i className="mdi mdi-play"/>
        </div>
    )
}