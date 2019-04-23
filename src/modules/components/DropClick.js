import React from 'react'
import { connect } from 'react-redux'

import { showDropdown } from '../dropdown/DropdownReducer'

export default connect(
    null,
    {
        showDropdown,
    }
)(function DropClick(props) {
    const {
        onClick,
        onRightClick,
        dropdown,
        rightDropdown,
        params,
        showDropdown,
        place,
        children,
        className,
        style,
    } = props

    const classes = [
        'drop-click',
        className,
    ].join(' ')

    const handleClick = (e) => {
        if (onClick) {
            onClick(e)
            return;
        }
        if (!dropdown) return console.warn('no dropdownType')
        showDropdown(dropdown, e, params, 0, place)
    }

    const handleRightClick = (e) => {
        if (onRightClick) {
            onRightClick(e)
            return;
        }
        showDropdown(rightDropdown, e, params, 0, place)
    }

    return (
        <div
            className={classes}
            onClick={handleClick}
            onContextMenu={handleRightClick}
            style={style}
        >
            {children}
        </div>
    )
})