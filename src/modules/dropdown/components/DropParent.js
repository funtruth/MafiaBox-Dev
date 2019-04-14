import React, { useState } from 'react'
import { connect } from 'react-redux'

import generatePushID from '../../common/generatePushID'

export default connect(
    state => ({
        dropdownKeys: state.dropdown.dropdownKeys,
    })
)(function DropParent(props) {
    //generate a unique serial number
    const [serialNo] = useState(generatePushID())
    const { icon, text, chosen, style, dropdownType, params, dropdownKeys, serialList } = props

    //if the top dropdown has current DropParent's serial number in it's serial list, highlight.
    const isOrigin = !!(dropdownKeys[dropdownKeys.length - 1]||[]).serialList
        && dropdownKeys[dropdownKeys.length - 1].serialList.includes(serialNo)

    //push serial number inside list
    const onMouseOver = e => {
        //if current DropParent is the origin, don't re-render the Dropdown
        if (!dropdownType || isOrigin) return;
        props.showDropdown(dropdownType, e, {
            ...params,
            serialList: (serialList||[]).concat(serialNo),
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
            {icon && <i className={`drop-down-menu-icon ${icon}`}></i>}
            {text || 'Parent'}
            <i className="mdi mdi-play"/>
        </div>
    )
})