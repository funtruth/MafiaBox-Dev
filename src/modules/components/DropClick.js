import React from 'react'
import './DropClick.css'
import { connect } from 'react-redux'

import { showDropdown } from '../dropdown/DropdownReducer'
import { showModal } from '../modal/ModalReducer'

export default connect(
    null,
    {
        showDropdown,
        showModal,
    }
)(function DropClick(props) {
    const {
        onClick,
        onRightClick,
        dropdown,
        modal,
        rightDropdown,
        params,
        showDropdown,
        showModal,
        place,
        children,
        className,
        disabled,
        style,
    } = props

    const classes = [
        disabled ? 'drop-click-frozen' : 'drop-click',
        className,
    ].join(' ')

    const handleClick = (e) => {
        if (disabled) return;
        if (onClick) {
            onClick(e)
            return;
        }
        if (modal) {
            showModal(modal, params)
            return;
        }
        if (dropdown) {
            showDropdown(dropdown, e, params, 0, place)
            return;
        }
        console.warn('no modal or dropdownType requested.')
    }

    const handleRightClick = (e) => {
        if (disabled) return;
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